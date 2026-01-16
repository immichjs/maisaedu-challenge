import { StudentResponseDto } from '@modules/student/application/dto/student-response.dto';
import { Student } from '../../domain/entities/student';

export class StudentResponseMapper {
	static toDto(student: Student): StudentResponseDto {
		return {
			id: student.id,
			name: student.name,
			email: student.email,
			cpf: student.cpf,
			ra: student.ra,
			createdAt: student.createdAt,
			updatedAt: student.updatedAt,
		};
	}
}
