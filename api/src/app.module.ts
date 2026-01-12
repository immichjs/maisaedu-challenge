import { databaseConfig, envValidationSchema, jwtConfig } from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, jwtConfig],
			validationSchema: envValidationSchema,
		}),
	],
})
export class AppModule {}
