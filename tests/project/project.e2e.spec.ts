import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { ProjectModule } from '@src/project/project.module'
import { TypeOrmTestingModule } from '@support/typeorm.module'
import { flushDb } from '@support/helpers'

let testModule: TestingModule
let app: INestApplication

beforeAll(async () => {
	testModule = await Test.createTestingModule({
		imports: [TypeOrmTestingModule, ProjectModule],
	}).compile()
	app = testModule.createNestApplication()
	await app.init()
})

beforeEach(async () => {
	await flushDb(testModule)
})

afterAll(async () => {
	await app.close()
})

describe('create', () => {
	test('should create with valid values', async () => {
		const response = await request(app.getHttpServer())
			.post('/project')
			.send({ name: 'Project 1', description: 'Some text' })
			.expect(200)
		expect(response.body).toMatchObject({
			name: 'Project 1',
			description: 'Some text',
			id: expect.any(Number),
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
		})
	})

	test('should throw when missing name', async () => {
		return request(app.getHttpServer())
			.post('/project')
			.send({ description: 'Some text' })
			.expect(400)
	})

	test('should throw when too long name', async () => {
		return request(app.getHttpServer())
			.post('/project')
			.send({
				description: 'Some text',
				name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbb',
			})
			.expect(400)
	})
})
