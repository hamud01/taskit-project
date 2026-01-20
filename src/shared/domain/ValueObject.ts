interface ValueObjectFormatting {
	trim?: boolean
	toLowerCase?: boolean
	toUpperCase?: boolean
	regExp?: RegExp
}

export default abstract class ValueObject {
	constructor(
		readonly name: string,
		protected _value: string,
		formatting?: ValueObjectFormatting,
	) {
		let normalized = this._value

		if (formatting?.toLowerCase) {
			normalized = normalized.toLowerCase()
		}

		if (formatting?.toUpperCase) {
			normalized = normalized.toUpperCase()
		}

		if (formatting?.regExp && !formatting?.regExp.test(normalized)) {
			throw new Error(`${this.name} has an invalid format`)
		}

		if (formatting?.trim) {
			normalized = normalized.trim()
		}

		this._value = normalized
	}

	equals(valueObject: ValueObject): boolean {
		return this._value === valueObject._value
	}

	get value(): string {
		return this._value
	}
}
