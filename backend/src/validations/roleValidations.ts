import Joi from 'joi';

export const createRoleValidation = Joi.object({
  name: Joi.string().required().alphanum().min(3).max(30),
});

export const updateRoleValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),

  active: Joi.boolean(),
});
