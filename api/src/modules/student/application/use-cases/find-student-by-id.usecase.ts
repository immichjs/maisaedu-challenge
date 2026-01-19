import { Inject, Injectable } from '@nestjs/common';

import { Student } from '@modules/student/domain/entities/student';
import type { IStudentRepository } from '@modules/student/domain/repositories/student.repository';
import { STUDENT_REPOSITORY } from '@modules/student/domain/repositories/student.repository';
import { StudentNotFoundError } from '../errors/student-not-found.error';

@Injectable()
export class FindStudentByUseCase {
	constructor(
		@Inject(STUDENT_REPOSITORY)
		private readonly repository: IStudentRepository,
	) {}

	async execute(id: string): Promise<Student> {
		const student = await this.repository.findById(id);

		if (!student) throw new StudentNotFoundError();

		return student;
	}
}
