import Joi from 'joi';

export const envValidationSchema = Joi.object({
	NODE_ENV: Joi.string()
		.valid('development', 'production')
		.default('development'),

	DB_HOST: Joi.string().hostname().required(),
	DB_PORT: Joi.number().port().required(),
	DB_NAME: Joi.string().min(1).required(),
	DB_USERNAME: Joi.string().min(1).required(),
	DB_PASSWORD: Joi.string().allow('').required(),

	JWT_SECRET: Joi.string().min(8).required(),
}).unknown(true);
