import { Body, Controller, Post } from '@nestjs/common';
import { CreateStudentDto } from '../application/dto/create-student.dto';
import { CreateStudentUseCase } from '../application/use-cases/create-student.usecase';
import { StudentResponseMapper } from '../infra/mappers/student-response.mapper';

@Controller('students')
export class StudentController {
	constructor(private readonly createStudent: CreateStudentUseCase) {}

	@Post()
	public async create(@Body() dto: CreateStudentDto) {
		const student = await this.createStudent.execute(dto);
		return StudentResponseMapper.toDto(student);
	}
}
