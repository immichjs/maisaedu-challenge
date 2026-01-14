import { IPagination } from '@common/pagination/pagination';
import { StudentSearchFilter } from './student-search-filter';
import { StudentSort } from './student-sort';

export interface StudentSearchCriteria {
	pagination: IPagination;
	filter?: StudentSearchFilter;
	sort?: StudentSort;
}
