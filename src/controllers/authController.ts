import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserModel from '~/models/user';
import { SystemError, ResponseSuccess, ResponseFailed } from '~/utils/response';
import { MESSAGE_ERR } from '~/utils/constant';

const User = new UserModel();
const secretKey = 'your-secret-key';

class AuthController {
  async generateToken(user: any): Promise<any> {
    return jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: '1h'
    });
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password }: any = req.body;
      const user = await User.findByEmail(email);
      if (!user) return ResponseFailed(res, MESSAGE_ERR.EMAIL_NOT_EXITS);
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return ResponseFailed(res, MESSAGE_ERR.INVALID_EMAIL_OR_PASSWORD);

      const accessToken = this.generateToken(user);
      return ResponseSuccess(res, accessToken);
    } catch (error) {
      return SystemError(res, MESSAGE_ERR.SYS_ERROR);
    }
  }
}

export default new AuthController();
