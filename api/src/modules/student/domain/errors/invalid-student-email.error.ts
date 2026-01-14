export class InvalidStudentEmailError extends Error {
	constructor(email: string) {
		super(`Invalid e-mail: ${email}`);
	}
}
