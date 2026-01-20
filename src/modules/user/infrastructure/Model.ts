import { type Document, model, Schema } from 'mongoose'

export interface UserDocument extends Document {
	username: string
	email: string
	password: string
	firstName: string
	lastName: string
	updatedAt: Date | null
	createdAt: Date
}

export const token = 'user:model'
const userSchema = new Schema<UserDocument>({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	createdAt: { type: Date, required: true },
	updatedAt: { type: Date, default: null },
})

const userModel = model<UserDocument>('User', userSchema)
export default function () {
	return userModel
}
