import { Request, Response } from "express";
import ProductModel from "~/models/product";
import { MESSAGE_ERR } from "~/utils/constant";
import { ResponseFailed, ResponseSuccess, SystemError } from "~/utils/response";

const Product = new ProductModel();

class ProductController {
     async findAll(req: Request, res: Response): Promise<any> {
    try {
      const products = await Product.findMany();
      return ResponseSuccess(res, products);
    } catch (e) {
      console.log(e);
      return SystemError(res, e);
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const product = await Product.findById(+id);
      if (!product) return ResponseFailed(res, MESSAGE_ERR.DATA_NOT_FOUND);
      return ResponseSuccess(res, product);
    } catch (e) {
      return SystemError(res, e);
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const user = await Product.create(req.body);
      return ResponseSuccess(res, user);
    } catch (e) {
      console.log(e);
      return SystemError(res, e);
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const product = await Product.findById(+id);
      if (!product) return ResponseFailed(res, MESSAGE_ERR.DATA_NOT_FOUND);
      const updatedUser = await Product.update(+id, req.body);
      return ResponseSuccess(res, updatedUser);
    } catch (e) {
      return SystemError(res, e);
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    try {
      const product = await Product.findById(+id);
      if (!product) return ResponseFailed(res, MESSAGE_ERR.EMAIL_NOT_EXITS);
      const deletedUser = await Product.delete(+id);
      return ResponseSuccess(res, deletedUser);
    } catch (e) {
      return SystemError(res, e);
    }
  }
}

export default new ProductController()