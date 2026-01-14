import { StudentEntity } from '../entities/student.entity';
import { StudentMapper } from './student.mapper';

import { Student } from '../../domain/entities/student';

describe('StudentMapper', () => {
	it('should map entity to domain correctly', () => {
		const entity = new StudentEntity();
		entity.id = 'c3a759a3-92fa-484d-8b7d-0a5bd83fdb9c';
		entity.name = 'John Doe';
		entity.email = 'john.doe@example.com';
		entity.cpf = '12345678901';
		entity.ra = 'A1B2C3';

		const student = StudentMapper.toDomain(entity);

		expect(student).toBeInstanceOf(Student);
		expect(student.id).toBe('c3a759a3-92fa-484d-8b7d-0a5bd83fdb9c');
		expect(student.name).toBe('John Doe');
		expect(student.email).toBe('john.doe@example.com');
		expect(student.cpf).toBe('12345678901');
		expect(student.ra).toBe('A1B2C3');
	});

	it('should map domain to entity correctly', () => {
		const now = new Date();

		const student = Student.create({
			id: 'c3a759a3-92fa-484d-8b7d-0a5bd83fdb9c',
			name: 'John Doe',
			email: 'JOHN.DOE@EXAMPLE.COM',
			cpf: '123.456.789-01',
			ra: 'a1b2c3',
			createdAt: now,
			updatedAt: now,
		});

		const entity = StudentMapper.toEntity(student);

		expect(entity).toBeInstanceOf(StudentEntity);
		expect(entity.id).toBe('c3a759a3-92fa-484d-8b7d-0a5bd83fdb9c');
		expect(entity.name).toBe('John Doe');
		expect(entity.email).toBe('john.doe@example.com');
		expect(entity.cpf).toBe('12345678901');
		expect(entity.ra).toBe('A1B2C3');
		expect(entity.createdAt).toBe(now);
		expect(entity.updatedAt).toBe(now);
	});
});
