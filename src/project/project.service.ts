import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(Project)
		private projectRepository: Repository<Project>,
	) {}

	async get(id: number): Promise<Project> {
		return this.projectRepository.findOneBy({ id });
	}

	async create(data: Partial<Project>) {
		const createdAt = new Date();
		return await this.projectRepository.save({
			...data,
			createdAt,
			updatedAt: createdAt,
		});
	}

	async delete(id: number) {
		const entity = await this.get(id);
		if (entity) {
			await this.projectRepository.remove(entity);
			return true;
		} else {
			return false;
		}
	}
}
