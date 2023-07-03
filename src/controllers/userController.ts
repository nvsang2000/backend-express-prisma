import { Request, Response } from 'express';
import UserModel from '../models/User';
import { ResponseSuccess, SystemError } from '../utils/response';
import { ResError } from '../utils/constant';

const userModel = new UserModel();

class UserController {
  async findMany(req: Request, res: Response): Promise<any> {
    try {
      const users = await userModel.findMany();
      return ResponseSuccess(res, users)
    } catch (error) {
      return SystemError(res, ResError.SYS_ERROR);
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const user = await userModel.findById(parseInt(id));
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Không tìm thấy người dùng.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin người dùng.' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const user = await userModel.create(username, password);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi khi tạo người dùng.' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const updatedUser = await userModel.update(parseInt(id), name, email);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'Không tìm thấy người dùng.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi khi cập nhật thông tin người dùng.' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedUser = await userModel.delete(parseInt(id));
      if (deletedUser) {
        res.json({ message: 'Xóa người dùng thành công.' });
      } else {
        res.status(404).json({ error: 'Không tìm thấy người dùng.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi khi xóa người dùng.' });
    }
  }
}

export default new UserController();