import { ApiProperty } from '@nestjs/swagger'
import {
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	Relation,
} from 'typeorm'
import { Task } from '../task/task.entity'

@Entity()
export class Tag {
	@PrimaryGeneratedColumn('increment')
	@ApiProperty()
	id: number

	@Column({
		length: 32,
	})
	@ApiProperty()
	name: string

	@ManyToMany(() => Task, (task) => task.tags, { onDelete: 'CASCADE' })
	tasks: Relation<Task>
}
