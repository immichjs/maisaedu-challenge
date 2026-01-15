import { Inject, Injectable } from '@nestjs/common';

import type { IStudentRepository } from '@modules/student/domain/repositories/student.repository';
import { STUDENT_REPOSITORY } from '@modules/student/domain/repositories/student.repository';
import { StudentNotFoundError } from '../errors/student-not-found.error';

@Injectable()
export class DeleteStudentUseCase {
	constructor(
		@Inject(STUDENT_REPOSITORY)
		private readonly repository: IStudentRepository,
	) {}

	async execute(id: string): Promise<void> {
		const student = await this.repository.findById(id);

		if (!student) throw new StudentNotFoundError();

		await this.repository.remove(id);
	}
}
