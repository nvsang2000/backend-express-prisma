import { Request, Response } from 'express';
import UserModel from '../models/User';

const userModel = new UserModel();

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng.' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await userModel.getUserById(parseInt(id));
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

  async createUser(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const user = await userModel.createUser(username, password);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi khi tạo người dùng.' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const updatedUser = await userModel.updateUser(parseInt(id), name, email);
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

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedUser = await userModel.deleteUser(parseInt(id));
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