import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { CreateStudentDto } from '../application/dto/create-student.dto';
import { SearchStudentsQueryDto } from '../application/dto/search-student-query.dto';
import { UpdateStudentDto } from '../application/dto/update-student.dto';
import { CreateStudentUseCase } from '../application/use-cases/create-student.usecase';
import { DeleteStudentUseCase } from '../application/use-cases/delete-student.usecase';
import { SearchStudentsUseCase } from '../application/use-cases/search-students.usecase';
import { UpdateStudentUseCase } from '../application/use-cases/update-student.usecase';
import { StudentResponseMapper } from '../infra/mappers/student-response.mapper';

@Controller('students')
export class StudentController {
	constructor(
		private readonly createStudent: CreateStudentUseCase,
		private readonly searchStudents: SearchStudentsUseCase,
		private readonly updateStudent: UpdateStudentUseCase,
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

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	public async update(
		@Param('id', new ParseUUIDPipe()) studentId: string,
		@Body() dto: UpdateStudentDto,
	) {
		const student = await this.updateStudent.execute(studentId, dto);
		return StudentResponseMapper.toDto(student);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async remove(@Param('id', new ParseUUIDPipe()) studentId: string) {
		return this.deleteStudent.execute(studentId);
	}
}
