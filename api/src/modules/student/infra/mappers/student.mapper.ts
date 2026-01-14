import { Cpf } from '@modules/student/domain/value-objects/cpf.vo';
import { Email } from '@modules/student/domain/value-objects/email.vo';
import { Name } from '@modules/student/domain/value-objects/name.vo';
import { Ra } from '@modules/student/domain/value-objects/ra.vo';
import { Student } from '../../domain/entities/student';
import { StudentEntity } from '../entities/student.entity';

export class StudentMapper {
	public static toDomain(entity: StudentEntity): Student {
		return new Student(
			entity.id,
			Name.create(entity.name),
			Email.create(entity.email),
			Cpf.create(entity.cpf),
			Ra.create(entity.ra),
			entity.createdAt,
			entity.updatedAt,
		);
	}

	public static toEntity(student: Student): StudentEntity {
		const entity = new StudentEntity();

		entity.id = student.id;
		entity.name = student.name;
		entity.email = student.email;
		entity.cpf = student.cpf;
		entity.ra = student.ra;
		entity.createdAt = student.createdAt;
		entity.updatedAt = student.updatedAt;

		return entity;
	}
}
