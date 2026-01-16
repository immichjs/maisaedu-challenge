import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	Length,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateStudentDto {
	@ApiProperty({
		description: 'Full name of the student',
		example: 'John Doe',
		maxLength: 128,
	})
	@IsNotEmpty()
	@MaxLength(128)
	name: string;

	@ApiProperty({
		description: 'Email address of the student',
		example: 'john.doe@gmail.com',
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'CPF number (11 digits, numbers only)',
		example: '12345678901',
		minLength: 11,
		maxLength: 11,
	})
	@IsNotEmpty()
	@Length(11, 11)
	cpf: string;

	@ApiProperty({
		description: 'Student RA (6 characters, unique identifier)',
		example: 'A12345',
		minLength: 6,
		maxLength: 6,
	})
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(6)
	ra: string;
}
