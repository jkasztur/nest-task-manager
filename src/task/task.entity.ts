import { ApiProperty } from '@nestjs/swagger'
import { Project } from '../project/project.entity'
import {
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	Relation,
} from 'typeorm'
import { TaskStatus } from './task.types'
import { Tag } from 'src/tag/tag.entity'

@Entity()
export class Task {
	@PrimaryGeneratedColumn('increment')
	@ApiProperty()
	id: number

	@Column({
		update: false,
	})
	@ApiProperty()
	createdAt: Date

	@Column()
	@ApiProperty()
	updatedAt: Date

	@Column({
		length: 512,
	})
	@ApiProperty()
	description: string

	@Column({
		type: 'enum',
		enum: Object.values(TaskStatus),
	})
	@ApiProperty()
	status: TaskStatus

	@ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
	project: Relation<Project>

	@ManyToMany(() => Tag, (tag) => tag.tasks, { onDelete: 'CASCADE' })
	tags: Relation<Task>[]
}
