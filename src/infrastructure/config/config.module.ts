import { ConfigModule as OriginalConfigModule } from '@nestjs/config';
import Joi from 'joi';

const validationSchema = Joi.object<any, false, IEnv>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.string().default('4000'),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  ACCESS_TOKEN_PRIVATEKEY: Joi.string().required(),
  ACCESS_TOKEN_EXPIRESIN: Joi.string().required(),

  SESSION_SECRET: Joi.string().required(),

  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),

  OAUTH_CALLBACK: Joi.string().required(),
});

export const ConfigModule = OriginalConfigModule.forRoot({
  isGlobal: true,
  cache: true,
  envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  validationOptions: {
    abortEarly: true,
  },
  validationSchema,
});
