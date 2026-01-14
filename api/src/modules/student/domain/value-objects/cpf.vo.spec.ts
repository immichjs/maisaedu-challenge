import { InvalidStudentCpfError } from '../errors/invalid-student-cpf.error';
import { Cpf } from './cpf.vo';

describe('Cpf Value Object', () => {
	it('should create a valid CPF with only digits', () => {
		const cpf = Cpf.create('12345678901');

		expect(cpf).toBeInstanceOf(Cpf);
		expect(cpf.value).toBe('12345678901');
	});

	it('should remove non-digit characters from CPF', () => {
		const cpf = Cpf.create('123.456.789-01');

		expect(cpf.value).toBe('12345678901');
	});

	it('should throw error when CPF has less than 11 digits', () => {
		expect(() => {
			Cpf.create('123');
		}).toThrow(InvalidStudentCpfError);
	});

	it('should throw error when CPF has more than 11 digits', () => {
		expect(() => {
			Cpf.create('1234567890123');
		}).toThrow(InvalidStudentCpfError);
	});

	it('should consider two CPFs equal when values are the same', () => {
		const cpf1 = Cpf.create('123.456.789-01');
		const cpf2 = Cpf.create('12345678901');

		expect(cpf1.equals(cpf2)).toBe(true);
	});

	it('should consider two CPFs different when values are not the same', () => {
		const cpf1 = Cpf.create('12345678901');
		const cpf2 = Cpf.create('10987654321');

		expect(cpf1.equals(cpf2)).toBe(false);
	});
});
