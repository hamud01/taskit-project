import type { RequestHandler } from 'express'
import { inject, injectable } from 'tsyringe'
import type { GetUserDTO, SignUpDTO } from '../application/DTOs'

export const token = 'user:routes'

@injectable()
export default class SignUp implements Route {
	constructor(
		@inject('user:use_case:sign-up')
		private readonly signUpUseCase: UseCase<SignUpDTO, GetUserDTO | null>,
	) {}
	readonly method = 'post'
	readonly path = '/sign-up'
	readonly pre: RequestHandler[] = []
	readonly post: RequestHandler[] = []

	readonly handler: RequestHandler = async (req, res) => {
		const result = await this.signUpUseCase.execute(req.body)
		if (!result) return res.status(400).json({ error: 'User already exists' })
		res.status(201).json(result)
	}
}
