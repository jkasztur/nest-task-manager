import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Task } from './task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskCreateParams, TaskStatus, TaskUpdateParams } from './task.types'

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private repository: Repository<Task>,
	) {}

	async get(id: number): Promise<Task> {
		return this.repository.findOneBy({ id })
	}

	async create(data: TaskCreateParams) {
		const createdAt = new Date()
		return await this.repository.save({
			...data,
			status: TaskStatus.New,
			createdAt,
			updatedAt: createdAt,
		})
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
}
