import User from '#user/domain/Entity'
import { Email, HashPassword, Name, Username } from '#user/domain/value_objects'
import type { UserDocument } from './Model'

export const token = 'user:mapper'

export default class UserMapper implements Mapper<User, UserDocument> {
	toDomain(document: UserDocument): User {
		return User.create({
			id: document._id.toString(),
			username: new Username(document.username),
			firstName: new Name(document.firstName),
			lastName: new Name(document.lastName),
			password: new HashPassword(document.password),
			email: new Email(document.email),
			updatedAt: document.updatedAt,
		})
	}

	toPersistence(entity: User): Partial<UserDocument> {
		return {
			username: entity.username.value,
			firstName: entity.firstName.value,
			lastName: entity.lastName.value,
			password: entity.password.value,
			email: entity.email.value,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		}
	}
}
