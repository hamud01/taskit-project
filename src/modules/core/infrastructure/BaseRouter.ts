import { Router } from 'express'
import { injectAll, injectable } from 'tsyringe'
import type RouterSlice from '#shared/infrastructure/RouterSlice'

export const token = 'router:base-router'

@injectable()
export default class BaseRouter {
	private readonly v1 = Router()
	constructor(
		@injectAll('router:slices')
		private readonly slices: RouterSlice[],
	) {
		for (const { basePath, router } of this.slices) {
			this.v1.use(basePath, router)
		}
	}

	get router() {
		return this.v1
	}
}
