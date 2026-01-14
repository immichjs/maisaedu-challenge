import { IPaginationMeta } from './pagination-meta';

export interface IPaginated<T> {
	items: T[];
	meta: IPaginationMeta;
}
