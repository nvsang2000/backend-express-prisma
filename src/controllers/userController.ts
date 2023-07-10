import { Request, Response } from 'express'
import UserModel from '../models/user'
import { ResponseFailed, ResponseSuccess, SystemError } from '../utils/response'
import { MESSAGE_ERR } from '../utils/constant'
import { hashedPassword } from '~/utils/helpers'

const User = new UserModel()

class UserController {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const users = await User.findMany()
      return ResponseSuccess(res, users)
    } catch (e) {
      console.log(e)
      return SystemError(res, e)
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    try {
      const user = await User.findById(+id)
      console.log('user', user)
      if (!user) return ResponseFailed(res, MESSAGE_ERR.DATA_NOT_FOUND)
      return ResponseSuccess(res, user)
    } catch (e) {
      return SystemError(res, e)
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body
    try {
      const checkUser = await User.findByEmail(email)
      if (checkUser) return ResponseFailed(res, MESSAGE_ERR.EMAIL_ALREADY_EXIST)
      const hashPassword = await hashedPassword(password)
      const user = await User.create({ email, password: hashPassword })
      return ResponseSuccess(res, user)
    } catch (e) {
      console.log(e)
      return SystemError(res, e)
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    try {
      const checkUser = await User.findById(+id)
      if (!checkUser) return ResponseFailed(res, MESSAGE_ERR.EMAIL_NOT_EXITS)
      const updatedUser = await User.update(+id, req.body)
      return ResponseSuccess(res, updatedUser)
    } catch (e) {
      return SystemError(res, e)
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    try {
      const checkUser = await User.findById(+id)
      if (!checkUser) return ResponseFailed(res, MESSAGE_ERR.EMAIL_NOT_EXITS)
      const deletedUser = await User.delete(+id)
      return ResponseSuccess(res, deletedUser)
    } catch (e) {
      return SystemError(res, e)
    }
  }
}

export default new UserController()
