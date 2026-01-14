import { Cpf } from '@modules/student/domain/value-objects/cpf.vo';
import { Email } from '@modules/student/domain/value-objects/email.vo';
import { Name } from '@modules/student/domain/value-objects/name.vo';
import { Ra } from '@modules/student/domain/value-objects/ra.vo';
import { Student } from '../../domain/entities/student';
import { StudentResponseMapper } from './student-response.mapper';

describe('StudentResponseMapper', () => {
	it('should map Student domain to StudentResponseDto correctly', () => {
		const now = new Date();
		const student = new Student(
			'c3a759a3-92fa-484d-8b7d-0a5bd83fdb9c',
			Name.create('John Doe'),
			Email.create('JOHN.DOE@EXAMPLE.COM'),
			Cpf.create('123.456.789-01'),
			Ra.create('a1b2c3'),
			now,
			now,
		);

		const dto = StudentResponseMapper.toDto(student);

		expect(dto).toEqual({
			id: 'c3a759a3-92fa-484d-8b7d-0a5bd83fdb9c',
			name: 'John Doe',
			email: 'john.doe@example.com',
			cpf: '12345678901',
			ra: 'A1B2C3',
			createdAt: now,
			updatedAt: now,
		});
	});
});
