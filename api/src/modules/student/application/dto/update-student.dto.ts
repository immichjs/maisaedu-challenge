import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UpdateStudentDto {
	@ApiPropertyOptional({
		description: 'Full name of the student',
		example: 'Jane Doe',
		maxLength: 128,
	})
	@IsOptional()
	@MaxLength(128)
	name?: string;

	@ApiPropertyOptional({
		description: 'Email address of the student',
		example: 'jane.doe@gmail.com',
	})
	@IsOptional()
	@IsEmail()
	email?: string;
}
