import { Injectable, PipeTransform, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common'
import { Schema } from 'joi'

@Injectable()
export class JoiValidationPipe<Output = any> implements PipeTransform<any, Output> {
	constructor(private schema: Schema) {
	}

	transform(value: any, _metadata: ArgumentMetadata): Output {
		const result = this.schema.validate(value, {
			stripUnknown: true,
			abortEarly: true
		})
		if (!result.error) {
			return result.value
		} else {
			throw new HttpException(`Validation failed: ${result.error.message}`, HttpStatus.BAD_REQUEST)
		}
	}
}