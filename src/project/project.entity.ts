import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {

	@PrimaryGeneratedColumn('increment')
	id: number

	@Column({
		length: 64,
		unique: true
	})
	name: string

	@Column({
		length: 512
	})
	description: string

	@Column({
		update: false
	})
	createdAt: Date

	@Column()
	updatedAt: Date
}