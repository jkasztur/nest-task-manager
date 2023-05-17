import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from '../../src/project/project.entity'
import { Task } from '../../src/task/task.entity'

export const TypeOrmTestingModule = TypeOrmModule.forRoot({
	type: 'postgres',
	host: process.env.POSTGRES_HOST || 'localhost',
	port: Number.parseInt(process.env.POSTGRES_PORT || '5432'),
	database: 'task_manager_test',
	username: 'task_manager_test',
	password: 'task_manager_test',
	entities: [Project, Task],
	synchronize: true,
})
