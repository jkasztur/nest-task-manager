import { ApiProperty } from '@nestjs/swagger'
import { Project } from '../project/project.entity'
import {
	Column,
	Entity,
	Index,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	Relation,
} from 'typeorm'
import { TaskStatus } from './task.types'
import { Tag } from '../tag/tag.entity'

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
		nullable: false,
	})
	@ApiProperty()
	description: string

	@Column({
		type: 'enum',
		enum: Object.values(TaskStatus),
	})
	@ApiProperty({ enum: Object.values(TaskStatus) })
	status: TaskStatus

	@ManyToOne(() => Project, (project) => project.tasks, {
		onDelete: 'CASCADE',
		nullable: false,
	})
	@Index()
	project: Relation<Project>

	@ManyToMany(() => Tag, (tag) => tag.tasks, { onDelete: 'CASCADE' })
	@JoinTable({ name: 'task_tags' })
	tags: Relation<Tag>[]
}
