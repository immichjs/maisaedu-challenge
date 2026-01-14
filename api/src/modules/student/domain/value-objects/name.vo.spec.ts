import { InvalidStudentNameError } from '../errors/invalid-student-name.error';
import { Name } from './name.vo';

describe('Name Value Object', () => {
	it('should create a valid name', () => {
		const name = Name.create('John Doe');

		expect(name).toBeInstanceOf(Name);
		expect(name.value).toBe('John Doe');
	});

	it('should trim whitespace from name', () => {
		const name = Name.create('   John Doe   ');

		expect(name.value).toBe('John Doe');
	});

	it('should allow name with exactly 128 characters', () => {
		const value = 'a'.repeat(128);

		const name = Name.create(value);

		expect(name.value.length).toBe(128);
	});

	it('should throw error when name exceeds 128 characters', () => {
		const value = 'a'.repeat(129);

		expect(() => {
			Name.create(value);
		}).toThrow(InvalidStudentNameError);
	});

	it('should consider two names equal when values are the same', () => {
		const name1 = Name.create('John Doe');
		const name2 = Name.create('John Doe');

		expect(name1.equals(name2)).toBe(true);
	});

	it('should consider two names different when values are not the same', () => {
		const name1 = Name.create('John Doe');
		const name2 = Name.create('Jane Doe');

		expect(name1.equals(name2)).toBe(false);
	});
});
