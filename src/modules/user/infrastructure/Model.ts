import { type Document, model, Schema } from 'mongoose'

export interface UserDocument extends Document {
	name: string
	email: string
	password: string
	firstName: string
	lastName: string
}

const userSchema = new Schema<UserDocument>({
	name: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
})

export default model<UserDocument>('User', userSchema)
export const token = 'user:model'
