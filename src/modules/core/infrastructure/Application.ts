import { inject, injectable } from 'tsyringe'
import type HttpServer from './HttpServer'
import type MongoDB from './MongoDB'

@injectable()
export default class Application {
	constructor(
		@inject('core:config')
		private readonly config: ApplicationConfig,

		@inject('core:http-server')
		private readonly httpServer: HttpServer,

		@inject('core:mongo-db')
		private readonly mongoDB: MongoDB,
	) {
		process.on('SIGINT', () => this.handleSignal('SIGINT'))
		process.on('SIGTERM', () => this.handleSignal('SIGTERM'))
	}

	/**
	 * Start the application
	 */
	async start() {
		console.log('Application is starting...')
		this.httpServer.run(this.config.httpServer)

		await this.mongoDB.connect(this.config.mongoDB)
	}

	/**
	 * Shutdown the application
	 */
	async shutdown() {
		console.log('Application is shutting down...')
		this.httpServer.close()
		process.exit(0)
	}

	/**
	 * Handle signals
	 * @param signal - Signal to handle
	 */
	private handleSignal(signal: string) {
		console.log(`Received ${signal}, shutting down...`)
		this.shutdown()
	}
}

export const token = 'core:application'
