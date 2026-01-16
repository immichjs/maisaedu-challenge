import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			stopAtFirstError: true,
			transformOptions: {
				enableImplicitConversion: false,
			},
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('MaisaEdu Student Management API')
		.setDescription(
			'REST API for managing student records in the MaisaEdu technical challenge. ' +
				'This API allows creating, updating, listing, searching and deleting students with pagination support.',
		)
		.setVersion('1.0.0')
		.addTag('students', 'Student management endpoints')
		.setLicense('MIT', 'https://opensource.org/licenses/MIT')
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory);

	await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
