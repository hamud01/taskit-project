import { inject, injectable } from 'tsyringe'
import type { GetUserDTO, SignUpDTO } from '#user/application/DTOs'
import User from '#user/domain/Entity'
import { Email, HashPassword, Name, Username } from '#user/domain/value_objects'

export const token = 'user:use_case:sign-up'

@injectable()
export default class SignIn implements UseCase<SignUpDTO, GetUserDTO | null> {
	constructor(
		@inject('user:repository:mongo')
		private readonly repository: Repository<User>,
	) {}

	async execute(input: SignUpDTO): Promise<GetUserDTO | null> {
		const user = User.create({
			id: null,
			updatedAt: null,
			username: new Username(input.username),
			firstName: new Name(input.firstName),
			lastName: new Name(input.lastName),
			password: new HashPassword(input.password),
			email: new Email(input.email),
		})

		const savedUser = await this.repository.save(user)

		if (!savedUser) return null
		if (!savedUser.id) return null

		return {
			id: savedUser.id,
			username: savedUser.username.value,
			firstName: savedUser.firstName.value,
			lastName: savedUser.lastName.value,
			email: savedUser.email.value,
			createdAt: savedUser.createdAt,
		}
	}
}
