import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'
import { Project } from '../project/project.entity'
import { Tag } from '../tag/tag.entity'

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
export class FilterItem implements IFilterItem {
	@ApiProperty({
		enum: [
			'description',
			'status',
			'createdAt',
			'projectId',
			'tagId',
			'projectName',
			'tagName',
		],
	})
	field: string
	@ApiProperty({ enum: ['gt', 'lt', 'eq'] })
	op: 'gt' | 'lt' | 'eq'
	@ApiProperty({ anyOf: [{ type: 'string' }, { type: 'number' }] })
	value: string | number
}

export interface IFilterItem {
	field: string
	op: string
	value: string | number
}
export class TaskSearchParams {
	@ApiProperty({ type: [FilterItem] })
	filters: FilterItem[]
	@ApiProperty()
	limit: number
	@ApiProperty({ nullable: true })
	after?: number
	@ApiProperty({ default: 'ASC' })
	order: Order
}

export class TaskSearchResult {
	@ApiProperty()
	items: ExportedTask[]
}

export enum Order {
	Asc = 'ASC',
	Desc = 'DESC',
}

export class ExportedTask {
	@ApiProperty()
	id: number

	@ApiProperty()
	createdAt: Date

	@ApiProperty()
	updatedAt: Date

	@ApiProperty()
	description: string

	@ApiProperty()
	status: TaskStatus

	@ApiProperty()
	project: Pick<Project, 'id' | 'name'>

	@ApiProperty()
	tags: Array<Pick<Tag, 'id' | 'name'>>
}
