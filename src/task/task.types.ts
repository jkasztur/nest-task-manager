import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

export enum TaskStatus {
	New = 'new',
	InProgress = 'in_progress',
	Completed = 'completed',
}

export class TaskCreateParams {
	@MaxLength(512)
	@ApiProperty({ required: true })
	description: string

	@ApiProperty({ required: true })
	projectId: number
}

export class TaskUpdateParams {
	@MaxLength(512)
	@ApiProperty()
	description?: string

	@ApiProperty()
	status?: TaskStatus
}
