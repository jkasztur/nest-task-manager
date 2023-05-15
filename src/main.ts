import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
	);
	const options = new DocumentBuilder()
		.setTitle('Task manager')
		.setDescription('Backend for service managing project tasks')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	await app.listen(80);
}
bootstrap();
