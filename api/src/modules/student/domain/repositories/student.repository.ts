import { IPaginated } from '@common/pagination/paginated';
import { Student } from '../entities/student';
import { StudentSearchCriteria } from './constraints/student-search-criteria';
import { StudentUniqueField } from './constraints/student-unique-field';

export const STUDENT_REPOSITORY = Symbol('STUDENT_REPOSITORY');

export interface IStudentRepository {
	save(student: Student): Promise<Student>;
	search(criteria: StudentSearchCriteria): Promise<IPaginated<Student>>;
	findById(id: string): Promise<Student | null>;
	existsBy(field: StudentUniqueField, value: string): Promise<boolean>;
	remove(id: string): Promise<void>;
}
