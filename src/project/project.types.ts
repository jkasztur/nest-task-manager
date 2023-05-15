import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class ProjectCreateParams {
	@MaxLength(64)
	@ApiProperty()
	name: string;

	@MaxLength(512)
	@ApiProperty()
	description: string;
}
