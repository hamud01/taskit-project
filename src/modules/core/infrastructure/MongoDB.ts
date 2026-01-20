import mongoose from 'mongoose'

export const token = 'core:mongo-db'
export default class MongoDB {
	async connect(config: ApplicationConfig['mongoDB']) {
		await mongoose.connect(config.uri)
		console.log('connected to mongodb')
	}

	async disconnect() {
		await mongoose.connection.close()
		console.log('disconnected from mongodb')
	}
}
