import bcrypt from 'bcrypt'

const saltRounds = 10
export const hashedPassword = async (password: string) => await bcrypt.hash(password, saltRounds)

export const isPasswordMatch = async (password: string, hashedPassword: string) =>
  await bcrypt.compare(password, hashedPassword)
