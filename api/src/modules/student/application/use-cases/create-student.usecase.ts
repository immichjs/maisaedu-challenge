import { Student } from '@modules/student/domain/entities/student';
import type { IStudentRepository } from '@modules/student/domain/repositories/student.repository';
import { STUDENT_REPOSITORY } from '@modules/student/domain/repositories/student.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { ConflictStudentCpfError } from '../errors/conflict-error-cpf.error';
import { ConflictStudentEmailError } from '../errors/conflict-error-email.error';
import { ConflictStudentRaError } from '../errors/conflict-error-ra.error';

@Injectable()
export class CreateStudentUseCase {
	constructor(
		@Inject(STUDENT_REPOSITORY)
		private readonly studentRepository: IStudentRepository,
	) {}

	public async execute(dto: CreateStudentDto): Promise<Student> {
		await this.validateUniqueness(dto);

		const student = Student.create(dto);

		return this.studentRepository.save(student);
	}

	private async validateUniqueness(dto: CreateStudentDto): Promise<void> {
		const [emailExists, cpfExists, raExists] = await Promise.all([
			this.studentRepository.existsBy('email', dto.email),
			this.studentRepository.existsBy('cpf', dto.cpf),
			this.studentRepository.existsBy('ra', dto.ra),
		]);

		if (emailExists) {
			throw new ConflictStudentEmailError();
		}

		if (cpfExists) {
			throw new ConflictStudentCpfError();
		}

		if (raExists) {
			throw new ConflictStudentRaError();
		}
	}
}
