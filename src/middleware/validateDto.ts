import { validate } from 'class-validator';
import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';

export const validateDto: (dtoClass: any) => RequestHandler = (dtoClass) => async (req, res, next) => {
  const dtoObject = plainToInstance(dtoClass, req.body);
  const errors = await validate(dtoObject);

  if (errors.length > 0) {
    const errorMessages = errors.map(error => error.constraints);
    return res.status(400).json(errorMessages);
  }

  req.body = dtoObject;
  next();
};
