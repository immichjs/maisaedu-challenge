import {
	IsEmail,
	IsNotEmpty,
	Length,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateStudentDto {
	@IsNotEmpty()
	@MaxLength(128)
	name: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Length(11, 11)
	cpf: string;

	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(6)
	ra: string;
}
