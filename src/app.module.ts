import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from './project/project.entity'
import { ProjectModule } from './project/project.module'
import { TaskModule } from './task/task.module'
import { Task } from './task/task.entity'
import { TagModule } from './tag/tag.module'
import { Tag } from './tag/tag.entity'
import { AppController } from './app.controller'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST || 'localhost',
			port: Number.parseInt(process.env.POSTGRES_PORT || '5432'),
			database: process.env.POSTGRES_DATABASE,
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			entities: [Project, Task, Tag],
			synchronize: true,
			logging: true,
		}),
		ProjectModule,
		TaskModule,
		TagModule,
	],
	controllers: [AppController],
})
export class AppModule {}
