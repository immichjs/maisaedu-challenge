import { IPaginated } from '@common/pagination/paginated';
import { Student } from '../entities/student';
import { StudentSearchCriteria } from './search/student-search-criteria';

export const STUDENT_REPOSITORY = Symbol('STUDENT_REPOSITORY');

export interface IStudentRepository {
	save(student: Student): Promise<Student>;
	search(criteria: StudentSearchCriteria): Promise<IPaginated<Student>>;
	findById(id: string): Promise<Student | null>;
	remove(id: string): Promise<void>;
}
