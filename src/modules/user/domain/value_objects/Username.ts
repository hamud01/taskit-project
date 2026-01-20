import ValueObject from '#shared/domain/ValueObject'

export class Username extends ValueObject {
	constructor(value: string) {
		super('Username', value, {
			trim: true,
			regExp: /^[a-zA-Z][a-zA-Z0-9._-]{2,31}$/,
		})
	}
}
