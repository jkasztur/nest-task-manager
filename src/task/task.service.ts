import { Injectable } from '@nestjs/common'
import {
	FindOptionsWhere,
	Repository,
	LessThan,
	MoreThan,
	Like,
	FindOperator,
} from 'typeorm'
import { Task } from './task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import {
	ExportedTask,
	FilterItem,
	Order,
	TaskCreateParams,
	TaskSearchParams,
	TaskSearchResult,
	TaskStatus,
	TaskUpdateParams,
} from './task.types'
import { TagService } from '../tag/tag.service'
import pick from 'object.pick'

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private repository: Repository<Task>,
		private tagService: TagService,
	) {}

	async get(
		id: number,
		withRelations = false,
		formatted = true,
	): Promise<ExportedTask | Task> {
		const task = await this.repository.findOne({
			where: { id },
			relations: withRelations ? ['project', 'tags'] : [],
		})
		return formatted ? this.formatTask(task) : task
	}

	async create(data: TaskCreateParams): Promise<ExportedTask> {
		const createdAt = new Date()
		const task = await this.repository.save({
			...data,
			project: { id: data.projectId },
			status: TaskStatus.New,
			createdAt,
			updatedAt: createdAt,
		})
		return this.formatTask(task)
	}

	async delete(id: number) {
		const entity = await this.get(id, false, false)
		if (entity) {
			await this.repository.remove(entity as Task)
			return true
		} else {
			return false
		}
	}

	async update(id: number, data: TaskUpdateParams): Promise<ExportedTask> {
		const updateResult = await this.repository.update(
			{ id },
			{
				...data,
				updatedAt: new Date(),
			},
		)
		if (updateResult.affected === 0) {
			return null
		}
		return this.formatTask(updateResult.raw)
	}

	async addTag(id: number, tagId: number): Promise<AddTagResult> {
		const task = await this.get(id, true, false)
		if (task.tags?.find((tag) => tag.id === tagId)) {
			// already assigned
			return { status: 'unchanged', task }
		}
		if (task.tags?.length >= 100) {
			return { status: 'max' }
		}
		const tag = await this.tagService.get(tagId)
		if (!task || !tag) {
			return { status: 'not_found' }
		}
		if (!task.tags) {
			task.tags = []
		}
		task.tags.push(tag)
		task.updatedAt = new Date()
		const updated = await this.repository.save(task)
		return { status: 'updated', task: this.formatTask(updated) }
	}

	async removeTag(id: number, tagId: number) {
		// TODO
	}

	async search(params: TaskSearchParams): Promise<TaskSearchResult> {
		const { filters, limit, after, order } = params
		const where = this.mapFilters(filters)
		if (after) {
			where.id = order === Order.Asc ? MoreThan(after) : LessThan(after)
		}
		const items = await this.repository.find({
			take: limit,
			where,
			relations: {
				project: true,
				tags: true,
			},
			order: {
				id: order,
			},
		})

		return {
			items: items.map(this.formatTask),
		}
	}

	private mapFilters(filters: FilterItem[]): FindOptionsWhere<Task> {
		return filters.reduce((final, filter) => {
			const op = this.mapOp(filter)
			switch (filter.field) {
				case 'projectId':
					return { ...final, project: { id: op } }
				case 'projectName':
					return { ...final, project: { name: op } }
				case 'tagId':
					return { ...final, tag: { id: op } }
				case 'tagName':
					return { ...final, tag: { name: op } }
				default:
					return { ...final, [filter.field]: op }
			}
		}, {})
	}

	private mapOp(
		filter: FilterItem,
	): FindOperator<FilterItem['value']> | FilterItem['value'] {
		switch (filter.op) {
			case 'eq':
				return filter.value
			case 'gt':
				return MoreThan(filter.value)
			case 'lt':
				return LessThan(filter.value)
			default:
				return Like(filter.value)
		}
	}

	private formatTask(task: Task): ExportedTask {
		return {
			...pick({ ...task }, [
				'id',
				'description',
				'status',
				'createdAt',
				'updatedAt',
			]),
			project: task.project ? pick(task.project, ['id', 'name']) : undefined,
			tags: task.tags
				? task.tags.map((tag) => pick(tag, ['id', 'name']))
				: undefined,
		}
	}
}

type AddTagResult = {
	status: 'updated' | 'unchanged' | 'not_found' | 'max' // TODO: move to enum
	task?: ExportedTask
}
