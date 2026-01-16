import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class SearchStudentsQueryDto {
	@ApiPropertyOptional({
		description: 'Page number for pagination',
		example: 1,
		minimum: 1,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number;

	@ApiPropertyOptional({
		description: 'Number of items per page',
		example: 10,
		minimum: 1,
		maximum: 50,
	})
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(50)
	perPage?: number;

	@ApiPropertyOptional({
		description:
			'Unified search term applied to name, email, RA and CPF fields',
	})
	@IsOptional()
	@IsString()
	q?: string;

	@ApiPropertyOptional({
		description: 'Field used to sort results',
		example: 'name',
		enum: ['name', 'email', 'ra', 'createdAt'],
	})
	@IsOptional()
	@IsIn(['name', 'email', 'ra', 'createdAt'])
	sortField?: 'name' | 'email' | 'ra' | 'createdAt';

	@ApiPropertyOptional({
		description: 'Sorting direction',
		example: 'ASC',
		enum: ['ASC', 'DESC'],
	})
	@IsOptional()
	@IsIn(['ASC', 'DESC'])
	sortDirection?: 'ASC' | 'DESC';
}
