import { databaseConfig, envValidationSchema } from '@config/index';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StudentModule } from './modules/student/student.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig],
			validationSchema: envValidationSchema,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const databaseConfig =
					configService.get<TypeOrmModuleOptions>('database');

				if (!databaseConfig) {
					throw new Error(
						'Missing database configuration. Did you load databaseConfig?',
					);
				}

				return { ...databaseConfig, autoLoadEntities: true };
			},
		}),
		StudentModule,
	],
})
export class AppModule {}
