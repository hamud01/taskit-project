export interface SignUpDTO {
	username: string
	email: string
	password: string
	firstName: string
	lastName: string
}

export interface SignInDTO {
	username: string
	password: string
}

export interface UpdateUserDTO {
	username?: string
	email?: string
	password?: string
	firstName?: string
	lastName?: string
}

export interface GetUserDTO {
	id: string
	username: string
	firstName: string
	lastName: string
	email: string
	createdAt: Date
}
