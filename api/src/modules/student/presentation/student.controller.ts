import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
} from '@nestjs/common';
import { CreateStudentDto } from '../application/dto/create-student.dto';
import { SearchStudentsQueryDto } from '../application/dto/search-student-query.dto';
import { CreateStudentUseCase } from '../application/use-cases/create-student.usecase';
import { DeleteStudentUseCase } from '../application/use-cases/delete-student.usecase';
import { SearchStudentsUseCase } from '../application/use-cases/search-students.usecase';
import { StudentResponseMapper } from '../infra/mappers/student-response.mapper';

@Controller('students')
export class StudentController {
	constructor(
		private readonly createStudent: CreateStudentUseCase,
		private readonly searchStudents: SearchStudentsUseCase,
		private readonly deleteStudent: DeleteStudentUseCase,
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() dto: CreateStudentDto) {
		const student = await this.createStudent.execute(dto);
		return StudentResponseMapper.toDto(student);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async search(@Query() query: SearchStudentsQueryDto) {
		const result = await this.searchStudents.execute(query);

		return {
			items: result.items.map((student) =>
				StudentResponseMapper.toDto(student),
			),
			meta: result.meta,
		};
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async remove(@Param('id', new ParseUUIDPipe()) studentId: string) {
		return this.deleteStudent.execute(studentId);
	}
}
