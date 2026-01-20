import { container } from 'tsyringe'
import { dependencyInjection } from './di'
import type Application from './modules/core/infrastructure/Application'

/**
 * bootstrap function is the entry point of the application
 */
export default async function bootstrap() {
	try {
		await dependencyInjection()
		const app = container.resolve<Application>('core:application')
		await app.start()
	} catch (error) {
		console.error('Error starting application', error)
		process.exit(1)
	}
}
