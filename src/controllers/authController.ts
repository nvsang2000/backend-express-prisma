import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "../models/User";
import { SystemError, ResponseSuccess } from "../utils/response";
import { ResError } from "../utils/constant";

const User = new UserModel();
const secretKey = "your-secret-key";

class AuthController {
  async generateToken(user: any): Promise<any> {
    return jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password }: any = req.body;
      const user = await User.findByEmail(email);
      if (!user)
        return res.status(401).json({ message: "Invalid email or password" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return res.status(401).json({ message: "Invalid email or password" });

      const accessToken = this.generateToken(user);
      return ResponseSuccess(res, accessToken);
    } catch (error) {
      return SystemError(res, ResError.SYS_ERROR);
    }
  }
}

export default new AuthController();
