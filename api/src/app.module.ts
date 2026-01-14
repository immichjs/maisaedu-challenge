import { databaseConfig, envValidationSchema, jwtConfig } from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, jwtConfig],
			validationSchema: envValidationSchema,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const databaseConfig = configService.get<DataSourceOptions>('database');

				if (!databaseConfig) {
					throw new Error(
						'Missing database configuration. Did you load databaseConfig?',
					);
				}

				return databaseConfig;
			},
		}),
	],
})
export class AppModule {}
