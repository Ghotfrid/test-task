import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  FIREBASE_API_KEY: Joi.string().required(),
  AUTH_DOMAIN: Joi.string().required(),
  PROJECT_ID: Joi.string().required(),
  STORAGE_BUCKET: Joi.string().required(),
  MESSAGING_SENDER_ID: Joi.string().required(),
  APP_ID: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),

  GOOGLE_APPLICATION_CREDENTIALS: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),

  API_KEY: Joi.string().required(),

  PORT: Joi.number().optional(),
});
