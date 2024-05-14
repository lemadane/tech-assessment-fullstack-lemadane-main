import { Router } from 'express'
import db from '../db'
import {
  createRoleValidation,
  updateRoleValidation,
} from '../validations/roleValidations'

const roleController = Router()

roleController.get('/', async (_, res, next) => {
  try {
    const roles = await db.role.findMany({
      where: {
        active: true,
      },
      include: {
        users: true,
      },
    })
    if (roles.length) {
      roles.forEach((role) => {
        if (role.users.length) {
          role.users.forEach((user) => delete user.password)
          role.users.forEach((user) => delete user.active)
        }
        delete role.active
      })
    }

    res.json(roles)
  } catch (err) {
    next(err)
  }
})

  .post('/', async (req, res, next) => {
    try {
      const { error } = createRoleValidation.validate(req.body)
      if (error) {
        throw { message: error.message, status: 400 }
      }
      const role = await db.role.create({
        data: req.body,
      })
      delete role.active
      res.json(role)
    } catch (err) {
      next(err)
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const role = await db.role.findUnique({
        where: {
          id: id,
          active: true,
        },
        include: {
          users: true,
        },
      })
      if (!role) {
        throw { message: 'Role not found', status: 404 }
      }
      delete role.active
      if (role.users.length) {
        role.users.forEach((user) => delete user.password)
        role.users.forEach((user) => delete user.active)
      }
      res.json(role)
    } catch (err) {
      next(err)
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const { error } = updateRoleValidation.validate(req.body)
      if (error) {
        throw { message: error.message, status: 400 }
      }
      const role = await db.role.update({
        where: {
          id,
          active: true,
        },
        data: req.body,
        include: {
          users: true,
        },
      })
      delete role.active
      if (role.users.length) {
        role.users.forEach((user) => delete user.password)
        role.users.forEach((user) => delete user.active)
      }
      res.json(role)
    } catch (err) {
      next(err)
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const role = await db.role.update({
        where: {
          id,
          active: true,
        },
        data: { active: false },
      })
      if (role.active) {
        throw new Error('User is not deleted')
      }
      res.json({ message: 'User is deleted' })
    } catch (err) {
      next(err)
    }
  })

export default roleController
