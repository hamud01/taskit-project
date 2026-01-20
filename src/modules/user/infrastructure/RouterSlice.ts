import { injectAll, injectable } from 'tsyringe'
import RouterSlice from '#shared/infrastructure/RouterSlice'

export const token = 'router:slices'

@injectable()
export default class UserRouterSlice extends RouterSlice {
	constructor(
		@injectAll('user:routes')
		routes: Route[],
	) {
		super('user', routes)
	}
}
