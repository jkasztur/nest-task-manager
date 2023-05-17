import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export class TagCreateParams {
	@MaxLength(64)
	@ApiProperty()
	name: string
}

export class TagUpdateParams {
	@MaxLength(32)
	@ApiProperty()
	name: string
}
