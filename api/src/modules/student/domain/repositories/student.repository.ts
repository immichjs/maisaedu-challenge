import { Student } from '../entities/student';

export const STUDENT_REPOSITORY = Symbol('STUDENT_REPOSITORY');

export interface IStudentRepository {
	save(student: Student): Promise<Student>;
	findById(id: string): Promise<Student | null>;
	remove(id: string): Promise<void>;
}
