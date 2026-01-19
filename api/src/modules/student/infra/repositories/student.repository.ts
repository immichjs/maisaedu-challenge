import { IPaginated } from '@common/pagination/paginated';
import { Student } from '@modules/student/domain/entities/student';
import { StudentSearchCriteria } from '@modules/student/domain/repositories/constraints/student-search-criteria';
import { StudentUniqueField } from '@modules/student/domain/repositories/constraints/student-unique-field';
import { IStudentRepository } from '@modules/student/domain/repositories/student.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { StudentMapper } from '../mappers/student.mapper';

@Injectable()
export class StudentRepository implements IStudentRepository {
	@InjectRepository(StudentEntity)
	private readonly repository: Repository<StudentEntity>;

	public async search(
		criteria: StudentSearchCriteria,
	): Promise<IPaginated<Student>> {
		const { page, perPage } = criteria.pagination;
		const { q, sort } = criteria;

		const qb = this.repository.createQueryBuilder('student');

		if (q) {
			qb.andWhere(
				new Brackets((qb) => {
					qb.where('student.name ILIKE :q')
						.orWhere('student.email ILIKE :q')
						.orWhere('student.ra ILIKE :q')
						.orWhere('student.cpf LIKE :q');
				}),
				{ q: `%${q}%` },
			);
		}

		if (sort) {
			qb.orderBy(`student.${sort.field}`, sort.direction);
		} else {
			qb.orderBy('student.createdAt', 'DESC');
		}

		qb.skip((page - 1) * perPage).take(perPage);

		const [entities, total] = await qb.getManyAndCount();

		return {
			items: entities.map((student) => StudentMapper.toDomain(student)),
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

	public async existsBy(
		field: StudentUniqueField,
		value: string,
	): Promise<boolean> {
		return this.repository.exists({
			where: { [field]: value },
		});
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
