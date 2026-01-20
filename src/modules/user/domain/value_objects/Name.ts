import ValueObject from '#shared/domain/ValueObject'

export class Name extends ValueObject {
	constructor(value: string) {
		super('Name', value, {
			trim: true,
			regExp: /^[A-Z][a-z]+(?:[ '-][A-Z][a-z]+)*$/,
		})
	}
}
