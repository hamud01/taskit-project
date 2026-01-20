import ValueObject from '#shared/domain/ValueObject'

export class Email extends ValueObject {
	constructor(value: string) {
		super('Email', value, {
			trim: true,
			toLowerCase: true,
			regExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		})
	}
}
