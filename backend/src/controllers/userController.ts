import { Router } from 'express';
import { User } from '@prisma/client';
import db from '../db';
import {
  createUserValidation,
  updateUserValidation,
} from '../validations/userValidations';
import { hash } from '../common/tokens';
import authMiddleware from '../middlewares/authMiddleware';

const userController = Router();

userController.use(authMiddleware);

userController
  .get('/', async (req, res, next) => {
    try {
      const users = await db.user.findMany({
        where: {
          active: true,
        },
        include: {
          role: true,
        },
      });
      if (users.length > 0) {
        users.forEach((user) => delete user.password);
        users.forEach((user) => delete user.active);
        users.forEach((user) => delete user.role.active);
      }
      res.json(users);
    } catch (err) {
      next(err);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const { error } = createUserValidation.validate(req.body);
      if (error) {
        throw { message: error.message, status: 400 };
      }
      const hashedPassword = await hash(req.body.password);
      const data = req.body as User;
      const user = await db.user.create({
        data: { ...data, password: hashedPassword },
        include: {
          role: true,
        },
      });
      delete user.password;
      delete user.active;
      delete user.role.active;
      res.json(user);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params as { id: string };
      const user = await db.user.findUnique({
        where: {
          id: id,
          active: true,
        },
        include: {
          role: true,
        },
      });
      if (!user) {
        throw { message: 'User not found', status: 404 };
      }
      delete user.password;
      delete user.active;
      delete user.role.active;
      res.json(user);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params as { id: string };
      const { error } = updateUserValidation.validate(req.body);
      if (error) {
        throw { message: error.message, status: 400 };
      }
      if (req.body.password) {
        req.body.password = await hash(req.body.password);
      }
      const user = await db.user.update({
        where: {
          id,
          active: true,
        },
        data: req.body,
        include: {
          role: true,
        },
      });
      delete user.password;
      delete user.active;
      delete user.role.active;
      res.json(user);
    } catch (err) {
      next(err);
    }
  })

  .delete(`/:id`, async (req, res, next) => {
    try {
      const { id } = req.params as { id: string };
      const user = await db.user.update({
        where: {
          id,
          active: true,
        },
        data: { active: false },
      });
      if (user.active) {
        throw new Error('User is not deleted');
      }
      res.json({ message: 'User is deleted' });
    } catch (err) {
      next(err);
    }
  });



export default userController;
