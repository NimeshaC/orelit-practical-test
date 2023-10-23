import * as Joi from "joi";

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "local").default("development"),
  PORT: Joi.number().default(8000),
});
