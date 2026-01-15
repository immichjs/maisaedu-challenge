import { IPaginated } from '@common/pagination/paginated';
import { Student } from '@modules/student/domain/entities/student';
import { StudentSearchCriteria } from '@modules/student/domain/repositories/constraints/student-search-criteria';
import type { IStudentRepository } from '@modules/student/domain/repositories/student.repository';
import { STUDENT_REPOSITORY } from '@modules/student/domain/repositories/student.repository';
import { Inject, Injectable } from '@nestjs/common';
import { SearchStudentsQueryDto } from '../dto/search-student-query.dto';

@Injectable()
export class SearchStudentsUseCase {
	constructor(
		@Inject(STUDENT_REPOSITORY)
		private readonly studentRepository: IStudentRepository,
	) {}

	public async execute(
		input: SearchStudentsQueryDto,
	): Promise<IPaginated<Student>> {
		const query = input.q?.trim();

		const criteria: StudentSearchCriteria = {
			pagination: {
				page: Math.max(1, input.page ?? 1),
				perPage: Math.max(1, input.perPage ?? 10),
			},
			q: query,
			sort: input.sortField
				? {
						field: input.sortField,
						direction: input.sortDirection ?? 'ASC',
					}
				: undefined,
		};

		return this.studentRepository.search(criteria);
	}
}
