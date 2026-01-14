import { InvalidStudentRaError } from '../errors/invalid-student-ra.error';
import { Ra } from './ra.vo';

describe('Ra Value Object', () => {
	it('should create a valid RA', () => {
		const ra = Ra.create('A1B2C3');

		expect(ra).toBeInstanceOf(Ra);
		expect(ra.value).toBe('A1B2C3');
	});

	it('should normalize RA (trim and uppercase)', () => {
		const ra = Ra.create('  a1b2c3  ');

		expect(ra.value).toBe('A1B2C3');
	});

	it('should throw error when RA has less than 6 characters', () => {
		expect(() => {
			Ra.create('A1B2');
		}).toThrow(InvalidStudentRaError);
	});

	it('should throw error when RA has more than 6 characters', () => {
		expect(() => {
			Ra.create('A1B2C3D');
		}).toThrow(InvalidStudentRaError);
	});

	it('should throw error when RA has invalid characters', () => {
		expect(() => {
			Ra.create('A1B-@');
		}).toThrow(InvalidStudentRaError);
	});

	it('should consider two RAs equal when values are the same', () => {
		const ra1 = Ra.create('a1b2c3');
		const ra2 = Ra.create('A1B2C3');

		expect(ra1.equals(ra2)).toBe(true);
	});

	it('should consider two RAs different when values are not the same', () => {
		const ra1 = Ra.create('A1B2C3');
		const ra2 = Ra.create('Z9X8W7');

		expect(ra1.equals(ra2)).toBe(false);
	});
});
