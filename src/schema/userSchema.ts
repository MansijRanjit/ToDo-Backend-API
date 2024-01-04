import Joi from "joi";

export const createUserSchema = Joi.object({
  username:Joi.string().required().min(4),
  email:Joi.string().email().required(),
  password:Joi.string().required().min(8)
})

export const loginSchema =Joi.object({
  username:Joi.string().required().min(4),
  password:Joi.string().required().min(8)
})