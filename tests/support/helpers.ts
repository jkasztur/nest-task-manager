import { TestingModule } from '@nestjs/testing'
import { getDataSourceToken } from '@nestjs/typeorm'

export async function flushDb(app: TestingModule) {
	const token = getDataSourceToken()
	const dataSource = app.get(token)
	const tables = dataSource.entityMetadatas.map((item) => item.tableName)
	for (const tableName of tables) {
		await dataSource.query(`TRUNCATE ${tableName} CASCADE;`)
	}
}
