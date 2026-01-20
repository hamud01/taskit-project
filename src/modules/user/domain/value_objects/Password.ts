import ValueObject from '#shared/domain/ValueObject'

export class Password extends ValueObject {
	constructor(value: string) {
		super('Password', value, {
			trim: true,
			regExp: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
		})
	}
}
