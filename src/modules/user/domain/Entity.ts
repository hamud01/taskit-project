import type { Email, HashPassword, Name, Username } from './value_objects'

interface UserEntityProps {
	id: string | null
	username: Username
	firstName: Name
	lastName: Name
	password: HashPassword
	email: Email
	updatedAt: Date | null
}

export default class Entity {
	private constructor(
		private readonly _id: string | null,
		private _username: Username,
		private _firstName: Name,
		private _lastName: Name,
		private _password: HashPassword,
		private _email: Email,
		private _createdAt: Date,
		private _updatedAt: Date | null,
	) {}

	static create(props: UserEntityProps) {
		return new Entity(
			props.id,
			props.username,
			props.firstName,
			props.lastName,
			props.password,
			props.email,
			new Date(),
			props.updatedAt,
		)
	}

	// Getters
	get id() {
		return this._id
	}

	get firstName() {
		return this._firstName
	}

	get lastName() {
		return this._lastName
	}

	get password() {
		return this._password
	}

	get email() {
		return this._email
	}

	get createdAt() {
		return this._createdAt
	}

	get updatedAt() {
		return this._updatedAt
	}

	get username() {
		return this._username
	}

	updateEmail(email: Email) {
		this._email = email
		this._updatedAt = new Date()
	}
}
