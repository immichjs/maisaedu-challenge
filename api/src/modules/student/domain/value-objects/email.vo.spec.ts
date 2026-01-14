import { InvalidStudentEmailError } from '../errors/invalid-student-email.error';
import { Email } from './email.vo';

describe('Email Value Object', () => {
	it('should create a valid email', () => {
		const email = Email.create('john.doe@example.com');

		expect(email).toBeInstanceOf(Email);
		expect(email.value).toBe('john.doe@example.com');
	});

	it('should normalize email (trim and lowercase)', () => {
		const email = Email.create('  JOHN.DOE@EXAMPLE.COM  ');

		expect(email.value).toBe('john.doe@example.com');
	});

	it('should throw error when email is invalid', () => {
		expect(() => {
			Email.create('invalid-email');
		}).toThrow(InvalidStudentEmailError);
	});

	it('should consider two emails equal when values are the same', () => {
		const email1 = Email.create('john.doe@example.com');
		const email2 = Email.create('JOHN.DOE@EXAMPLE.COM');

		expect(email1.equals(email2)).toBe(true);
	});

	it('should consider two emails different when values are not the same', () => {
		const email1 = Email.create('john.doe@example.com');
		const email2 = Email.create('jane.doe@example.com');

		expect(email1.equals(email2)).toBe(false);
	});
});
