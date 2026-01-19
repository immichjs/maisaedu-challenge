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
import {
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { CreateStudentDto } from '../application/dto/create-student.dto';
import { SearchStudentsQueryDto } from '../application/dto/search-student-query.dto';
import { UpdateStudentDto } from '../application/dto/update-student.dto';
import { CreateStudentUseCase } from '../application/use-cases/create-student.usecase';
import { DeleteStudentUseCase } from '../application/use-cases/delete-student.usecase';
import { FindStudentByUseCase } from '../application/use-cases/find-student-by-id.usecase';
import { SearchStudentsUseCase } from '../application/use-cases/search-students.usecase';
import { UpdateStudentUseCase } from '../application/use-cases/update-student.usecase';
import { StudentResponseMapper } from '../infra/mappers/student-response.mapper';

@ApiTags('students')
@Controller('students')
export class StudentController {
	constructor(
		private readonly createStudent: CreateStudentUseCase,
		private readonly searchStudents: SearchStudentsUseCase,
		private readonly findStudentById: FindStudentByUseCase,
		private readonly updateStudent: UpdateStudentUseCase,
		private readonly deleteStudent: DeleteStudentUseCase,
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new student' })
	@ApiResponse({ status: 201, description: 'Student created successfully' })
	@ApiResponse({ status: 400, description: 'Invalid input data' })
	public async create(@Body() dto: CreateStudentDto) {
		const student = await this.createStudent.execute(dto);
		return StudentResponseMapper.toDto(student);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Search students with pagination and unified query',
	})
	@ApiQuery({
		name: 'q',
		required: false,
		description: 'Search term for name, email, RA or CPF',
	})
	@ApiQuery({ name: 'page', required: false, description: 'Page number' })
	@ApiQuery({ name: 'perPage', required: false, description: 'Items per page' })
	@ApiResponse({
		status: 200,
		description: 'Students list returned successfully',
	})
	public async search(@Query() query: SearchStudentsQueryDto) {
		const result = await this.searchStudents.execute(query);

		return {
			items: result.items.map((student) =>
				StudentResponseMapper.toDto(student),
			),
			meta: result.meta,
		};
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get a student by ID' })
	@ApiParam({ name: 'id', description: 'Student UUID', example: 'uuid-v4' })
	@ApiResponse({ status: 200, description: 'Student found successfully' })
	@ApiResponse({ status: 404, description: 'Student not found' })
	public async findById(@Param('id', new ParseUUIDPipe()) studentId: string) {
		const student = await this.findStudentById.execute(studentId);
		return StudentResponseMapper.toDto(student);
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Update a student by ID' })
	@ApiParam({ name: 'id', description: 'Student UUID' })
	@ApiResponse({ status: 200, description: 'Student updated successfully' })
	@ApiResponse({ status: 404, description: 'Student not found' })
	public async update(
		@Param('id', new ParseUUIDPipe()) studentId: string,
		@Body() dto: UpdateStudentDto,
	) {
		const student = await this.updateStudent.execute(studentId, dto);
		return StudentResponseMapper.toDto(student);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete a student by ID' })
	@ApiParam({ name: 'id', description: 'Student UUID' })
	@ApiResponse({ status: 204, description: 'Student deleted successfully' })
	@ApiResponse({ status: 404, description: 'Student not found' })
	public async remove(@Param('id', new ParseUUIDPipe()) studentId: string) {
		return this.deleteStudent.execute(studentId);
	}
}
