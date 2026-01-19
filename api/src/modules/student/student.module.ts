import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateStudentUseCase } from './application/use-cases/create-student.usecase';
import { DeleteStudentUseCase } from './application/use-cases/delete-student.usecase';
import { FindStudentByUseCase } from './application/use-cases/find-student-by-id.usecase';
import { SearchStudentsUseCase } from './application/use-cases/search-students.usecase';
import { UpdateStudentUseCase } from './application/use-cases/update-student.usecase';
import { STUDENT_REPOSITORY } from './domain/repositories/student.repository';
import { StudentEntity } from './infra/entities/student.entity';
import { StudentRepository } from './infra/repositories/student.repository';
import { StudentController } from './presentation/student.controller';

@Module({
	imports: [TypeOrmModule.forFeature([StudentEntity])],
	controllers: [StudentController],
	providers: [
		{ provide: STUDENT_REPOSITORY, useClass: StudentRepository },
		CreateStudentUseCase,
		SearchStudentsUseCase,
		FindStudentByUseCase,
		UpdateStudentUseCase,
		DeleteStudentUseCase,
	],
})
export class StudentModule {}
