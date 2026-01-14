import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableStudents1768378739399 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'students',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
						length: '128',
						isNullable: false,
					},
					{
						name: 'email',
						type: 'varchar',
						length: '320',
						isNullable: false,
					},
					{
						name: 'cpf',
						type: 'varchar',
						length: '11',
						isNullable: false,
					},
					{
						name: 'ra',
						type: 'varchar',
						length: '12',
						isNullable: false,
					},
					{
						name: 'created_at',
						type: 'timestamptz',
						isNullable: false,
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamptz',
						isNullable: false,
						default: 'now()',
					},
				],
			}),
			true,
		);

		await queryRunner.createIndices('students', [
			new TableIndex({
				name: 'IDX_STUDENTS_EMAIL_UNIQUE',
				columnNames: ['email'],
				isUnique: true,
			}),
			new TableIndex({
				name: 'IDX_STUDENTS_CPF_UNIQUE',
				columnNames: ['cpf'],
				isUnique: true,
			}),
			new TableIndex({
				name: 'IDX_STUDENTS_RA_UNIQUE',
				columnNames: ['ra'],
				isUnique: true,
			}),
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('students');
	}
}
