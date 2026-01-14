import { ConflictException } from '@nestjs/common';

export class ConflictStudentCpfError extends ConflictException {
	constructor() {
		super('Student CPF already exists');
	}
}
