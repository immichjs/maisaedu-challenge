import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UpdateStudentDto {
	@IsOptional()
	@MaxLength(128)
	name?: string;

	@IsOptional()
	@IsEmail()
	email?: string;
}
