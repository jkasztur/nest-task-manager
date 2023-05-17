import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('app')
export class AppController {
	@Get('/status')
	@ApiResponse({ status: 200 })
	status() {
		return { ok: true }
	}
}
