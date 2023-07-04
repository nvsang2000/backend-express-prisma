import { Request, Response } from "express";
import UserModel from "../models/user";
import {
  ResponseFailed,
  ResponseSuccess,
  SystemError,
} from "../utils/response";
import { MESSAGE_ERR } from "../utils/constant";

const User = new UserModel();

class UserController {
  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const users = await User.findMany();
      return ResponseSuccess(res, users);
    } catch (e) {
      console.log(e)
      return SystemError(res, MESSAGE_ERR.SYS_ERROR);
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const user = await User.findById(parseInt(id));
      if (!user) return ResponseFailed(res, MESSAGE_ERR.EMAIL_NOT_EXIST);
      return ResponseSuccess(res, user);
    } catch (e) {
      return SystemError(res, MESSAGE_ERR.SYS_ERROR);
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    try {
      console.log('hello', req.body);
      
      const checkUser = await User.findByEmail(email);
      if (checkUser) return ResponseFailed(res, MESSAGE_ERR.EMAIL_INVALID);
      const user = await User.create(req.body);
      return ResponseSuccess(res, user);
    } catch (e) {
      console.log(e)
      return SystemError(res, MESSAGE_ERR.SYS_ERROR);
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const checkUser = await User.findById(+id);
      if (!checkUser) return ResponseFailed(res, MESSAGE_ERR.EMAIL_INVALID);
      const updatedUser = await User.update(+id, req.body);
      return ResponseSuccess(res, updatedUser);
    } catch (e) {
      return SystemError(res, MESSAGE_ERR.SYS_ERROR);
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const checkUser = await User.findById(+id);
      if (!checkUser) return ResponseFailed(res, MESSAGE_ERR.EMAIL_INVALID);
      const deletedUser = await User.delete(parseInt(id));
      return ResponseSuccess(res, deletedUser);
    } catch (e) {
      return SystemError(res, MESSAGE_ERR.SYS_ERROR);
    }
  }
}

export default new UserController();
