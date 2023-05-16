import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
