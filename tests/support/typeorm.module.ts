import { TypeOrmModule } from "@nestjs/typeorm"
import { Project } from "@src/project/project.entity"

export const TypeOrmTestingModule = TypeOrmModule.forRoot({
	type: 'postgres',
	host: process.env.POSTGRES_HOST || 'localhost',
	port: Number.parseInt(process.env.POSTGRES_PORT || '5432'),
	database: 'tasks_manager_test',
	username: 'tasks_manager_test',
	password: 'tasks_manager_test',
	entities: [Project],
	synchronize: true,
})
