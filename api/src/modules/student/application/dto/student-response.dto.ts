import { ApiProperty } from '@nestjs/swagger';

export class StudentResponseDto {
	@ApiProperty({
		description: 'Student unique identifier (UUID)',
		example: 'c3a759a3-92fa-484d-8b7d-0a5bd83fdb9c',
	})
	id: string;

	@ApiProperty({
		description: 'Full name of the student',
		example: 'Michel França',
	})
	name: string;

	@ApiProperty({
		description: 'Email address of the student',
		example: 'michel.franca@email.com',
	})
	email: string;

	@ApiProperty({
		description: 'CPF number (11 digits)',
		example: '12345678901',
	})
	cpf: string;

	@ApiProperty({
		description: 'Student RA (unique identifier)',
		example: 'A12345',
	})
	ra: string;

	@ApiProperty({
		description: 'Creation date',
		example: '2026-01-16T10:30:00.000Z',
	})
	createdAt: Date;

	@ApiProperty({
		description: 'Last update date',
		example: '2026-01-16T11:00:00.000Z',
	})
	updatedAt: Date;
}
