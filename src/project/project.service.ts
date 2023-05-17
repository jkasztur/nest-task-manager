import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Project } from './project.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ProjectCreateParams, ProjectUpdateParams } from './project.types'

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(Project)
		private projectRepository: Repository<Project>,
	) {}

	async get(id: number): Promise<Project> {
		return this.projectRepository.findOneBy({ id })
	}

	async create(data: ProjectCreateParams) {
		const createdAt = new Date()
		return await this.projectRepository.save({
			...data,
			createdAt,
			updatedAt: createdAt,
		})
	}

	async delete(id: number) {
		const entity = await this.get(id)
		if (entity) {
			await this.projectRepository.remove(entity)
			return true
		} else {
			return false
		}
	}

	async update(id: number, data: ProjectUpdateParams): Promise<Project> {
		const updateResult = await this.projectRepository.update(
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
