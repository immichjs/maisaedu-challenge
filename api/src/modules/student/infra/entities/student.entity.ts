import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('students')
export class StudentEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 128 })
	name: string;

	@Index({ unique: true })
	@Column({ length: 320 })
	email: string;

	@Index({ unique: true })
	@Column({ length: 11 })
	cpf: string;

	@Index({ unique: true })
	@Column({ length: 12 })
	ra: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
	updatedAt: Date;
}
