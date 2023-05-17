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
import { ProjectCreateParams, ProjectUpdateParams } from './project.types'
import { ProjectService } from './project.service'
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Project } from './project.entity'

@Controller({ path: '/project' })
@UsePipes(new ValidationPipe())
@ApiTags('project')
export class ProjectController {
	constructor(private service: ProjectService) {}

	@Post()
	@ApiBody({ type: ProjectCreateParams })
	@ApiResponse({ status: 200, type: Project })
	@HttpCode(200)
	async create(@Body() body: ProjectCreateParams) {
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
	@ApiResponse({ status: 200, type: Project })
	@HttpCode(200)
	async get(@Query('id', new ParseIntPipe()) id: number) {
		const project = await this.service.get(id)
		if (!project) {
			throw new HttpException('Project not found', 404)
		}
		return project
	}

	@Patch('/:id')
	@ApiQuery({ name: 'id', type: 'number' })
	@ApiBody({ type: ProjectUpdateParams })
	@ApiResponse({ status: 200, type: Project })
	@HttpCode(200)
	async update(
		@Query('id', new ParseIntPipe()) id: number,
		@Body() body: ProjectUpdateParams,
	) {
		const updated = await this.service.update(id, body)
		if (!updated) {
			throw new HttpException('Project not found', 404)
		}
		return updated
	}
}
