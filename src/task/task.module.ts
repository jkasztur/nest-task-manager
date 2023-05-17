import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'
import { TagModule } from 'src/tag/tag.module'

@Module({
	imports: [TypeOrmModule.forFeature([Task]), TagModule],
	controllers: [TaskController],
	providers: [TaskService],
})
export class TaskModule {}
