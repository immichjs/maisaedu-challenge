import { InvalidStudentNameError } from '../errors/invalid-student-name.error';

export class Name {
	constructor(private readonly _value: string) {}

	public static create(value: string): Name {
		const normalized = value.trim();

		if (normalized.length > 128) {
			throw new InvalidStudentNameError();
		}

		return new Name(normalized);
	}

	get value() {
		return this._value;
	}

	public equals(other: Name): boolean {
		return this._value === other._value;
	}
}
