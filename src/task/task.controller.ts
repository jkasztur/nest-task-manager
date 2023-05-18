import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	ParseIntPipe,
	Post,
	Param,
	Patch,
	UsePipes,
	ValidationPipe,
	HttpException,
	Res,
	Type,
} from '@nestjs/common'
import {
	ExportedTask,
	TaskCreateParams,
	TaskSearchParams,
	TaskSearchResult,
	TaskUpdateParams,
} from './task.types'
import { TaskService } from './task.service'
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

@Controller({ path: '/task' })
@UsePipes(new ValidationPipe())
@ApiTags('task')
export class TaskController {
	constructor(private service: TaskService) {}

	@Post()
	@ApiBody({ type: TaskCreateParams })
	@ApiResponse({ status: 200, type: ExportedTask })
	@HttpCode(200)
	async create(@Body() body: TaskCreateParams) {
		return await this.service.create(body)
	}

	@Delete('/:id')
	@ApiParam({ name: 'id', type: 'number' })
	@ApiResponse({ status: 200 })
	@HttpCode(200)
	async delete(@Param('id', new ParseIntPipe()) id: number) {
		const deleted = await this.service.delete(id)
		return { deleted }
	}

	@Get('/:id')
	@ApiParam({ name: 'id', type: 'number' })
	@ApiResponse({ status: 200, type: ExportedTask })
	@HttpCode(200)
	async get(@Param('id', new ParseIntPipe()) id: number) {
		const project = await this.service.get(id)
		if (!project) {
			throw new HttpException('Task not found', 404)
		}
		return project
	}

	@Patch('/:id')
	@ApiParam({ name: 'id', type: 'number' })
	@ApiBody({ type: TaskUpdateParams })
	@ApiResponse({ status: 200, type: ExportedTask })
	@HttpCode(200)
	async update(
		@Param('id', new ParseIntPipe()) id: number,
		@Body() body: TaskUpdateParams,
	) {
		const updated = await this.service.update(id, body)
		if (!updated) {
			throw new HttpException('Task not found', 404)
		}
		return updated
	}

	@Patch('/:id/tag/:tagId')
	@ApiParam({ name: 'id', type: 'number' })
	@ApiParam({ name: 'tagId', type: 'number' })
	@ApiResponse({ status: 200, type: ExportedTask })
	@HttpCode(200)
	@HttpCode(204)
	async addTag(
		@Param('id', new ParseIntPipe()) id: number,
		@Param('tagId', new ParseIntPipe()) tagId: number,
		@Res() response: Response,
	) {
		const result = await this.service.addTag(id, tagId)
		switch (result.status) {
			case 'not_found':
				throw new HttpException('Task or tag not found', 404)
			case 'unchanged':
				response.status(204)
				response.send(result.task)
				break
			case 'max':
				response.status(422)
				response.send({ message: 'Task already has max tags' })
				break
			default:
				response.send(result.task)
		}
	}

	@Post('/search')
	@ApiBody({ type: TaskSearchParams })
	@ApiResponse({ status: 200, type: TaskSearchResult })
	@HttpCode(200)
	async search(@Body() body: TaskSearchParams) {
		return await this.service.search(body)
	}
}
