import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST ?? 'localhost',
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USERNAME ?? 'postgres',
	password: process.env.DB_PASSWORD ?? 'postgres',
	database: process.env.DB_NAME ?? 'postgres',
	entities: [__dirname + '/../modules/**/infra/entities/*.entity.{.ts,.js}'],
	migrations: [__dirname + '/../infra/typeorm/migrations/*{.ts,.js}'],
	synchronize: false,
	migrationsRun: true,
	logging: true,
};

export const databaseConfig = registerAs('database', () => config);

export const dataSource = new DataSource(config);
