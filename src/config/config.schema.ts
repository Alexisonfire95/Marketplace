import * as Joi from "joi"

export const databaseSchema = Joi.object({
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().required()
})

export const apiSchema = Joi.object({
  API_PORT: Joi.number().port().required()
})

export const nodeEnvSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("production")
})

export const configValidationSchema = Joi.object()
  .concat(databaseSchema)
  .concat(apiSchema)
  .concat(nodeEnvSchema)
