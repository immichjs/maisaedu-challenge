import { InvalidStudentCpfError } from '../errors/invalid-student-cpf.error';

export class Cpf {
	private constructor(private readonly _value: string) {}

	public static create(value: string): Cpf {
		const digits = (value ?? '').replace(/\D/g, '');

		if (digits.length !== 11) {
			throw new InvalidStudentCpfError();
		}

		return new Cpf(digits);
	}

	get value() {
		return this._value;
	}

	equals(other: Cpf): boolean {
		return this._value === other._value;
	}
}
