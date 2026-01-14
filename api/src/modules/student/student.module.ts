import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './infra/entities/student.entity';

@Module({
	imports: [TypeOrmModule.forFeature([StudentEntity])],
})
export class StudentModule {}
