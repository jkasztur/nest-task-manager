import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Tag } from './tag.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TagCreateParams, TagUpdateParams } from './tag.types'

@Injectable()
export class TagService {
	constructor(
		@InjectRepository(Tag)
		private repository: Repository<Tag>,
	) {}

	async get(id: number): Promise<Tag> {
		return this.repository.findOneBy({ id })
	}

	async create(data: TagCreateParams) {
		return await this.repository.save(data)
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

	async update(id: number, data: TagUpdateParams): Promise<Tag> {
		const updateResult = await this.repository.update({ id }, data)
		if (updateResult.affected === 0) {
			return null
		}
		return updateResult.raw
	}
}
