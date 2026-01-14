import { StudentReponseDto } from '@modules/student/application/dto/student-response.dto';
import { Student } from '../../domain/entities/student';

export class StudentResponseMapper {
	static toDto(student: Student): StudentReponseDto {
		return {
			id: student.id,
			name: student.name,
			email: student.email,
			cpf: student.cpf,
			ra: student.ra,
		};
	}
}
