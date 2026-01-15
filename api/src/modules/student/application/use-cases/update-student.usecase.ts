import { Student } from '@modules/student/domain/entities/student';
import type { IStudentRepository } from '@modules/student/domain/repositories/student.repository';
import { STUDENT_REPOSITORY } from '@modules/student/domain/repositories/student.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { ConflictStudentEmailError } from '../errors/conflict-error-email.error';
import { StudentNotFoundError } from '../errors/student-not-found.error';

@Injectable()
export class UpdateStudentUseCase {
	constructor(
		@Inject(STUDENT_REPOSITORY)
		private readonly studentRepository: IStudentRepository,
	) {}

	public async execute(
		studentId: string,
		input: UpdateStudentDto,
	): Promise<Student> {
		const student = await this.studentRepository.findById(studentId);

		if (!student) {
			throw new StudentNotFoundError();
		}

		if (input.email) {
			const normalizedEmail = input.email.trim().toLowerCase();

			const emailAlreadyExists =
				normalizedEmail !== student.email &&
				(await this.studentRepository.existsBy('email', normalizedEmail));

			if (emailAlreadyExists) {
				throw new ConflictStudentEmailError();
			}

			student.changeEmail(input.email);
		}

		if (input.name) {
			student.changeName(input.name);
		}

		return this.studentRepository.save(student);
	}
}
