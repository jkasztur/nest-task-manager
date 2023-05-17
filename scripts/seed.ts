import axios, { AxiosInstance } from 'axios'
import { faker } from '@faker-js/faker'

let client: AxiosInstance
async function seed() {
	console.log('Staring seed')

	client = axios.create({ baseURL: 'http://localhost:3001' })

	const statusResponse = await client.get('/status')
	if (statusResponse.status !== 200) {
		console.log(
			'Service is not started or not running on localhost:3001. Exiting',
		)
		process.exit(1)
	}
	const projectIds = await seedProjects()
	const tagIds = await seedTags()
	const taskIds = await seedTasks(projectIds, tagIds)
	console.log('Finished seed')
}

async function seedProjects() {
	console.log('Seeding 10 projects')
	const ids: number[] = []
	for (let i = 0; i < 10; i++) {
		const response = await client.post('/project', {
			name: faker.word.noun(),
			description: faker.company.buzzPhrase(),
		})
		ids.push(response.data.id)
	}
	return ids
}

async function seedTags() {
	console.log('Seeding 200 tags')
	const ids: number[] = []
	for (let i = 0; i < 200; i++) {
		const response = await client.post('/tag', {
			name: faker.word.noun(),
		})
		ids.push(response.data.id)
	}
	return ids
}

async function seedTasks(projectIds: number[], tagIds: number[]) {
	for (const projectId of projectIds) {
		console.log(
			`Seeding tasks for project ${projectIds.indexOf(projectId) + 1} / ${
				projectIds.length
			}`,
		)
		const taskCount = faker.number.int({ min: 10, max: 50 })
		for (let i = 0; i < taskCount; i++) {
			const response = await client.post('/task', {
				description: faker.word.noun(),
				projectId,
			})
			const tagCount = faker.number.int({ min: 1, max: 100 })
			// choose random tags
			const tagsToApply = [...tagIds]
				.sort(() => 0.5 - Math.random())
				.slice(0, tagCount)
			for (const tagId of tagsToApply) {
				await client.patch(`/task/${response.data.id}/tag/${tagId}`)
			}
		}
	}
}

seed()
