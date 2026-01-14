import { ConflictException } from '@nestjs/common';

export class ConflictStudentRaError extends ConflictException {
	constructor() {
		super('Student RA already exists');
	}
}
