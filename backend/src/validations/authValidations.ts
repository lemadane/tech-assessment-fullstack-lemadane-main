import Joi from "joi"

export const loginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});


export const refreshTokenValidation = Joi.object({
  refreshToken: Joi.string().required(),
});
