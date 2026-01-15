import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateStudentDto } from '../application/dto/create-student.dto';
import { SearchStudentsQueryDto } from '../application/dto/search-student-query.dto';
import { CreateStudentUseCase } from '../application/use-cases/create-student.usecase';
import { SearchStudentsUseCase } from '../application/use-cases/search-students.usecase';
import { StudentResponseMapper } from '../infra/mappers/student-response.mapper';

@Controller('students')
export class StudentController {
	constructor(
		private readonly createStudent: CreateStudentUseCase,
		private readonly searchStudents: SearchStudentsUseCase,
	) {}

	@Post()
	public async create(@Body() dto: CreateStudentDto) {
		const student = await this.createStudent.execute(dto);
		return StudentResponseMapper.toDto(student);
	}

	@Get()
	public async search(@Query() query: SearchStudentsQueryDto) {
		const result = await this.searchStudents.execute(query);

		return {
			items: result.items.map((student) =>
				StudentResponseMapper.toDto(student),
			),
			meta: result.meta,
		};
	}
}
