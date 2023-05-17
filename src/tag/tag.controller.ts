import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	ParseIntPipe,
	Post,
	Query,
	Patch,
	UsePipes,
	ValidationPipe,
	HttpException,
} from '@nestjs/common'
import { TagCreateParams, TagUpdateParams } from './tag.types'
import { TagService } from './tag.service'
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Tag } from './tag.entity'

@Controller({ path: '/tag' })
@UsePipes(new ValidationPipe())
@ApiTags('tag')
export class TagController {
	constructor(private service: TagService) {}

	@Post()
	@ApiBody({ type: TagCreateParams })
	@ApiResponse({ status: 200, type: Tag })
	@HttpCode(200)
	async create(@Body() body: TagCreateParams) {
		return await this.service.create(body)
	}

	@Delete('/:id')
	@ApiQuery({ name: 'id', type: 'number' })
	@ApiResponse({ status: 200 })
	@HttpCode(200)
	async delete(@Query('id', new ParseIntPipe()) id: number) {
		const deleted = await this.service.delete(id)
		return { deleted }
	}

	@Get('/:id')
	@ApiQuery({ name: 'id', type: 'number' })
	@ApiResponse({ status: 200, type: Tag })
	@HttpCode(200)
	async get(@Query('id', new ParseIntPipe()) id: number) {
		const project = await this.service.get(id)
		if (!project) {
			throw new HttpException('Tag not found', 404)
		}
		return project
	}

	@Patch('/:id')
	@ApiQuery({ name: 'id', type: 'number' })
	@ApiBody({ type: TagUpdateParams })
	@ApiResponse({ status: 200, type: Tag })
	@HttpCode(200)
	async update(
		@Query('id', new ParseIntPipe()) id: number,
		@Body() body: TagUpdateParams,
	) {
		const updated = await this.service.update(id, body)
		if (!updated) {
			throw new HttpException('Tag not found', 404)
		}
		return updated
	}
}
