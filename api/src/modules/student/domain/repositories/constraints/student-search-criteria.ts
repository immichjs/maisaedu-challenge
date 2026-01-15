import { IPagination } from '@common/pagination/pagination';
import { StudentSort } from './student-sort';

export interface StudentSearchCriteria {
	pagination: IPagination;
	q?: string;
	sort?: StudentSort;
}
