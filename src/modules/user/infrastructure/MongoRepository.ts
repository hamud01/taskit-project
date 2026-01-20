import type { Model } from 'mongoose'
import { inject, injectable } from 'tsyringe'
import type User from '#user/domain/Entity'
import type { UserDocument } from './Model'

export const token = 'user:repository:mongo'

@injectable()
export default class MongoRepository implements Repository<User> {
	constructor(
		@inject('user:model')
		private readonly model: Model<UserDocument>,

		@inject('user:mapper')
		private readonly mapper: Mapper<User, UserDocument>,
	) {}

	async save(entity: User): Promise<User | null> {
		if (entity.id && (await this.model.exists({ _id: entity.id }))) {
			const updatedDocument = await this.model.findByIdAndUpdate(
				entity.id,
				this.mapper.toPersistence(entity),
				{
					new: true,
				},
			)
			return updatedDocument ? this.mapper.toDomain(updatedDocument) : null
		}

		const document = this.mapper.toPersistence(entity)
		const savedDocument = await this.model.create(document)
		return this.mapper.toDomain(savedDocument)
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.model.deleteOne({ _id: id })
		return result.deletedCount === 1
	}

	async find(id: string): Promise<User | null> {
		const document = await this.model.findById(id)
		return document ? this.mapper.toDomain(document) : null
	}

	async findAll(): Promise<User[]> {
		const documents = await this.model.find()
		return documents.map((document) => this.mapper.toDomain(document))
	}
}
