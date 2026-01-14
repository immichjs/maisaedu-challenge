import { IPaginated } from '@common/interfaces/paginated.interface';
import { IPagination } from '@common/interfaces/pagination.interface';
import { Student } from '@modules/student/domain/entities/student';
import { IStudentRepository } from '@modules/student/domain/repositories/student.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { StudentMapper } from '../mappers/student.mapper';

@Injectable()
export class StudentRepository implements IStudentRepository {
	@InjectRepository(StudentEntity)
	private readonly repository: Repository<StudentEntity>;

	public async find(pagination: IPagination): Promise<IPaginated<Student>> {
		const { page, perPage } = pagination;

		const [entities, total] = await this.repository.findAndCount({
			skip: (page - 1) * perPage,
			take: perPage,
			order: { createdAt: 'DESC' },
		});

		const items = entities.map((item) => StudentMapper.toDomain(item));

		return {
			items,
			meta: {
				page,
				perPage,
				total,
				totalPages: Math.ceil(total / perPage),
			},
		};
	}

	public async findById(id: string): Promise<Student | null> {
		const entity = await this.repository.findOne({
			where: { id },
		});

		if (!entity) return null;

		return StudentMapper.toDomain(entity);
	}

	public async save(student: Student): Promise<Student> {
		const entity = StudentMapper.toEntity(student);
		const savedEntity = await this.repository.save(entity);

		return StudentMapper.toDomain(savedEntity);
	}

	public async remove(id: string): Promise<void> {
		await this.repository.delete(id);
	}
}
