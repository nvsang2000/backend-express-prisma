import { validate } from 'class-validator';
import { RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';

export const validateDto: (dtoClass: any) => RequestHandler = (dtoClass) => async (req, res, next) => {
  const dtoObject = plainToClass(dtoClass, req.body);
  const errors = await validate(dtoObject);

  if (errors.length > 0) {
    // Xử lý lỗi nếu có
    const errorMessages = errors.map(error => error.constraints);
    return res.status(400).json(errorMessages);
  }

  // Dữ liệu hợp lệ, tiếp tục xử lý
  req.body = dtoObject;
  next();
};
