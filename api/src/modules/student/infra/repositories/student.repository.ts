import { IPaginated } from '@common/pagination/paginated';
import { Student } from '@modules/student/domain/entities/student';
import { StudentSearchCriteria } from '@modules/student/domain/repositories/search/student-search-criteria';
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

	public async search(
		criteria: StudentSearchCriteria,
	): Promise<IPaginated<Student>> {
		const { page, perPage } = criteria.pagination;
		const { filter, sort } = criteria;

		const qb = this.repository.createQueryBuilder('student');

		if (filter?.name) {
			qb.andWhere('student.name ILIKE :name', {
				name: `%${filter.name}%`,
			});
		}

		if (filter?.email) {
			qb.andWhere('student.email ILIKE :email', {
				email: `%${filter.email}%`,
			});
		}

		if (filter?.cpf) {
			qb.andWhere('student.cpf = :cpf', {
				cpf: filter.cpf,
			});
		}

		if (filter?.ra) {
			qb.andWhere('student.ra = :ra', {
				ra: filter.ra,
			});
		}

		if (sort) {
			qb.orderBy(`student.${sort.field}`, sort.direction);
		} else {
			qb.orderBy('student.name', 'ASC');
		}

		qb.skip((page - 1) * perPage).take(perPage);

		const [entities, total] = await qb.getManyAndCount();

		return {
			items: entities.map((entity) => StudentMapper.toDomain(entity)),
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
