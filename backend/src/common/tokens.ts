import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function hash(text: string) {
  const saltRounds = parseInt(process.env.saltRounds)
  return await bcrypt.hash(text, saltRounds)
}

export async function hashCompare(text: string, hash: string) {
  return await bcrypt.compare(text, hash)
}

export async function token() {
  return await bcrypt.genSalt(parseInt(process.env.saltRounds))
}

export async function secret() {
  return await hash(await token())
}

export async function getAccessToken(
  user: string,
  role: string,
  minutes: number
) {
  return await jwt.sign({ user, role }, process.env.accessToken, {
    expiresIn: `${minutes}m`,
  })
}

export async function verifyAccessToken(token: string) {
  return await jwt.verify(token, process.env.accessToken)
}

export async function getRefreshToken(
  user: string,
  role: string,
  hours: number
) {
  return await jwt.sign({ user, role }, process.env.refreshToken, {
    expiresIn: `${hours}h`,
  })
}

export async function verifyRefreshToken(token: string) {
  return await jwt.verify(token, process.env.refreshToken)
}
