import { ConflictException } from '@nestjs/common';

export class ConflictStudentEmailError extends ConflictException {
	constructor() {
		super('Student email already exists');
	}
}
