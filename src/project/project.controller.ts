import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	ParseIntPipe,
	Post,
	Patch,
	UsePipes,
	ValidationPipe,
	HttpException,
	Param,
} from '@nestjs/common'
import { ProjectCreateParams, ProjectUpdateParams } from './project.types'
import { ProjectService } from './project.service'
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
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
	@ApiParam({ name: 'id', type: 'number' })
	@ApiResponse({ status: 200 })
	@HttpCode(200)
	async delete(@Param('id', new ParseIntPipe()) id: number) {
		const deleted = await this.service.delete(id)
		return { deleted }
	}

	@Get('/:id')
	@ApiParam({ name: 'id', type: 'number' })
	@ApiResponse({ status: 200, type: Project })
	@HttpCode(200)
	async get(@Param('id', new ParseIntPipe()) id: number) {
		const project = await this.service.get(id)
		if (!project) {
			throw new HttpException('Project not found', 404)
		}
		return project
	}

	@Patch('/:id')
	@ApiParam({ name: 'id', type: 'number' })
	@ApiBody({ type: ProjectUpdateParams })
	@ApiResponse({ status: 200, type: Project })
	@HttpCode(200)
	async update(
		@Param('id', new ParseIntPipe()) id: number,
		@Body() body: ProjectUpdateParams,
	) {
		const updated = await this.service.update(id, body)
		if (!updated) {
			throw new HttpException('Project not found', 404)
		}
		return updated
	}
}
