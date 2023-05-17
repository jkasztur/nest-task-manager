import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken, getConnectionToken } from '@nestjs/typeorm'
import { ProjectController } from '@src/project/project.controller'
import { Project } from '@src/project/project.entity'
import { ProjectModule } from '@src/project/project.module'
import { flushDb } from '@support/helpers'
import { TypeOrmTestingModule } from '@support/typeorm.module'
import { Repository } from 'typeorm'

let testModule: TestingModule
let repo: Repository<Project>
let controller: ProjectController

beforeAll(async () => {
	testModule = await Test.createTestingModule({
		imports: [TypeOrmTestingModule, ProjectModule]
	}).compile()
	const token = getRepositoryToken(Project)
	repo = testModule.get(token)
	controller = testModule.get(ProjectController)
})

beforeEach(async () => {
	await flushDb(testModule)
})

afterAll(async () => {
	await testModule.close()
})

describe('create', () => {
	test('should create with valid values', async () => {
		const response = await controller.create({
			name: 'Project 1',
			description: 'Some text'
		})
		expect(response).toMatchObject({
			name: 'Project 1',
			description: 'Some text',
			id: expect.any(Number),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		})
	})
})

// TODO: complete tests
