import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export class ProjectCreateParams {
	@MaxLength(64)
	@ApiProperty()
	name: string

	@MaxLength(512)
	@ApiProperty()
	description: string
}

export class ProjectUpdateParams {
	@MaxLength(64)
	@ApiProperty({ required: false })
	name?: string

	@MaxLength(512)
	@ApiProperty({ required: false })
	description?: string
}