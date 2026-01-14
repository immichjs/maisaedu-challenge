import { InvalidStudentRaError } from '../errors/invalid-student-ra.error';

export class Ra {
	private constructor(private readonly _value: string) {}

	static create(value: string): Ra {
		const normalized = (value ?? '').trim().toUpperCase();

		if (!/^[A-Z0-9]{6}$/.test(normalized)) {
			throw new InvalidStudentRaError();
		}

		return new Ra(normalized);
	}

	get value(): string {
		return this._value;
	}
}
