import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SearchStudentsQueryDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	perPage?: number;

	@IsOptional()
	@IsString()
	q?: string;

	@IsOptional()
	@IsIn(['name', 'email', 'ra', 'createdAt'])
	sortField?: 'name' | 'email' | 'ra' | 'createdAt';

	@IsOptional()
	@IsIn(['ASC', 'DESC'])
	sortDirection?: 'ASC' | 'DESC';
}
