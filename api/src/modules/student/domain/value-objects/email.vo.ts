import { InvalidStudentEmailError } from '../errors/invalid-student-email.error';

export class Email {
	private constructor(private readonly _value: string) {}

	public static create(value: string): Email {
		const normalized = value.trim().toLowerCase();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

		if (!emailRegex.test(normalized)) {
			throw new InvalidStudentEmailError(normalized);
		}

		return new Email(value.trim());
	}

	get value(): string {
		return this._value;
	}

	equals(other: Email): boolean {
		return this._value === other._value;
	}
}
