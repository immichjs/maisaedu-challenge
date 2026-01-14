import { randomUUID } from 'crypto';
import { Cpf } from '../value-objects/cpf.vo';
import { Email } from '../value-objects/email.vo';
import { Name } from '../value-objects/name.vo';
import { Ra } from '../value-objects/ra.vo';

interface IStudentProps {
	id?: string;
	name: string;
	email: string;
	cpf: string;
	ra: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Student {
	constructor(
		private readonly _id: string,
		private _name: Name,
		private _email: Email,
		private _cpf: Cpf,
		private _ra: Ra,
		private readonly _createdAt: Date,
		private _updatedAt: Date,
	) {}

	public static create(props: IStudentProps): Student {
		const now = new Date();

		return new Student(
			props.id ?? randomUUID(),
			Name.create(props.name),
			Email.create(props.email),
			Cpf.create(props.cpf),
			Ra.create(props.ra),
			props.createdAt ?? now,
			props.updatedAt ?? now,
		);
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name.value;
	}

	get email(): string {
		return this._email.value;
	}

	get cpf(): string {
		return this._cpf.value;
	}

	get ra(): string {
		return this._ra.value;
	}

	get createdAt(): Date {
		return this._createdAt;
	}

	get updatedAt(): Date {
		return this._updatedAt;
	}

	public changeName(newName: string): void {
		this._name = Name.create(newName);
		this.touch();
	}

	public changeEmail(newEmail: string): void {
		this._email = Email.create(newEmail);
		this.touch();
	}

	private touch(): void {
		this._updatedAt = new Date();
	}
}
