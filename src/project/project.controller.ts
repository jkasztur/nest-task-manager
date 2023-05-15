import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ProjectCreateParams } from './project.types';
import { ProjectService } from './project.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Project } from './project.entity';

@Controller({ path: '/project' })
export class ProjectController {
	constructor(private service: ProjectService) {}

	@Post()
	@ApiBody({ type: ProjectCreateParams })
	@ApiResponse({ status: 200, type: Project })
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async create(@Body() body: ProjectCreateParams) {
		return await this.service.create(body);
	}
}
