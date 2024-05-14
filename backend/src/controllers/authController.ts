import { Router } from "express"
import { loginValidation, refreshTokenValidation } from "../validations/authValidations"
import db from "../db"
import { getAccessToken, getRefreshToken, hashCompare, verifyRefreshToken } from "../common/tokens"

const authController = Router()

authController
  .post('/login', async (req, res, next) => {
    try {
      const { error } = loginValidation.validate(req.body)
      if (error) {
        throw { message: error.message, status: 400 }
      }
      const user = await db.user.findUnique({
        where: { username: req.body.username },
        include: { role: true }
      })
      if (!user) {
        throw { message: 'Invalid username or password', status: 400 }
      }
      const match = hashCompare(req.body.password, user.password)
      if (!match) {
        throw { message: 'Invalid username or password', status: 400 }
      }
      const accessToken = await getAccessToken(user.id, user.role.name, 60)
      const refreshToken = await getRefreshToken(user.id, user.role.name, 3)
      res.json({ accessToken, refreshToken })
    } catch (err) {
      next(err)
    }
  })

  .post('/getaccesstoken', async (req, res, next) => {
    try {
      const { error } = refreshTokenValidation.validate(req.body)
      if(error) {
        throw { message: error.message, status: 400 }
      }
      const { user, role } = await verifyRefreshToken(req.body.refreshToken) as { user: string, role: string }
      const accgessToken = getAccessToken(user, role, 15)
      res.json({ accgessToken })
    } catch (err) {
      next(err)
    }
  })

export default authController
