import { NotFoundException } from '@nestjs/common';

export class StudentNotFoundError extends NotFoundException {
	constructor() {
		super('Student not found');
	}
}
