import { container, type InjectionToken } from 'tsyringe'
import type { constructor as Constructor } from 'tsyringe/dist/typings/types'

/**
 * Registers a module in the dependency injection container
 * @param dependency - The dependency to register
 * @param token - The injection token for the dependency
 */
export function registerModule(
	dependency: unknown,
	token: InjectionToken,
): void {
	if (typeof dependency === 'function') {
		container.registerSingleton(token, dependency as Constructor<unknown>)
		return
	}
	container.register(token, {
		useValue: dependency,
	})
}
