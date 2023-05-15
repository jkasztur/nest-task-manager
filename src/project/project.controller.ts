import { Body, Controller, Get, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ProjectCreateParams } from "./project.types";
import { JoiValidationPipe } from "./project.pipeline";
import * as Joi from 'joi';
import { ProjectService } from "./project.service";

@Controller({ path: '/project' })
export class ProjectController {

	constructor(private service: ProjectService) {
	}

	@Post()
	@UsePipes(new JoiValidationPipe(Joi.object().keys({
		name: Joi.string().max(64).required(),
		description: Joi.string().max(512).required()
	}).required()))
	@HttpCode(200)
	async create(@Body() body: ProjectCreateParams) {
		return await this.service.create(body)
	}


}