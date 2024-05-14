import Joi from 'joi'

export const createUserValidation = Joi.object({
  username: Joi.string().required().alphanum().min(3).max(20),

  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }),

  roleId: Joi.string()
    .required()
    .length(25)
    .pattern(/^[a-z0-9]+$/),
})

export const updateUserValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(20),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'org'] },
  }),

  roleId: Joi.string()
    .length(25) // Fixed length of 18 characters
    .pattern(/^[a-z0-9]+$/), // Lowercas

  active: Joi.boolean(),
})
