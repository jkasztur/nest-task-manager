import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Task } from './task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskCreateParams, TaskStatus, TaskUpdateParams } from './task.types'
import { TagService } from 'src/tag/tag.service'

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private repository: Repository<Task>,
		private tagService: TagService,
	) {}

	async get(id: number, withRelations = false): Promise<Task> {
		return this.repository.findOne({
			where: { id },
			relations: withRelations ? ['tags'] : [],
		})
	}

	async create(data: TaskCreateParams) {
		const createdAt = new Date()
		return await this.repository.save(
			{
				...data,
				project: { id: data.projectId },
				status: TaskStatus.New,
				createdAt,
				updatedAt: createdAt,
			},
			{},
		)
	}

	async delete(id: number) {
		const entity = await this.get(id)
		if (entity) {
			await this.repository.remove(entity)
			return true
		} else {
			return false
		}
	}

	async update(id: number, data: TaskUpdateParams): Promise<Task> {
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
		return updateResult.raw
	}

	async addTag(id: number, tagId: number): Promise<AddTagResult> {
		const task = await this.get(id, true)
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
		return { status: 'updated', task: updated }
	}
}

type AddTagResult = {
	status: 'updated' | 'unchanged' | 'not_found' | 'max' // TODO: move to enum
	task?: Task
}
