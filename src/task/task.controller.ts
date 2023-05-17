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
import { TaskCreateParams, TaskUpdateParams } from './task.types'
import { TaskService } from './task.service'
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Task } from './task.entity'

@Controller({ path: '/task' })
@UsePipes(new ValidationPipe())
@ApiTags('task')
export class TaskController {
	constructor(private service: TaskService) { }

	@Post()
	@ApiBody({ type: TaskCreateParams })
	@ApiResponse({ status: 200, type: Task })
	@HttpCode(200)
	async create(@Body() body: TaskCreateParams) {
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
	@ApiResponse({ status: 200, type: Task })
	@HttpCode(200)
	async get(@Query('id', new ParseIntPipe()) id: number) {
		const project = await this.service.get(id)
		if (!project) {
			throw new HttpException('Task not found', 404)
		}
		return project
	}

	@Patch('/:id')
	@ApiQuery({ name: 'id', type: 'number' })
	@ApiBody({ type: TaskUpdateParams })
	@ApiResponse({ status: 200, type: Task })
	@HttpCode(200)
	async update(
		@Query('id', new ParseIntPipe()) id: number,
		@Body() body: TaskUpdateParams,
	) {
		const updated = await this.service.update(id, body)
		if (!updated) {
			throw new HttpException('Task not found', 404)
		}
		return updated
	}
}
