import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateStudentUseCase } from './application/use-cases/create-student.usecase';
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
	],
})
export class StudentModule {}
