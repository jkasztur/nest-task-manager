import { ApiProperty } from '@nestjs/swagger'
import { Task } from '../task/task.entity'
import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
} from 'typeorm'

@Entity()
export class Project {
	@PrimaryGeneratedColumn('increment')
	@ApiProperty()
	id: number

	@Column({
		length: 64,
		unique: true,
	})
	@ApiProperty()
	name: string

	@Column({
		length: 512,
	})
	@ApiProperty()
	description: string

	@Column({
		update: false,
	})
	@ApiProperty()
	createdAt: Date

	@Column()
	@ApiProperty()
	updatedAt: Date

	@OneToMany(() => Task, (task) => task.project, { onDelete: 'CASCADE' })
	tasks: Relation<Task>[]
}
