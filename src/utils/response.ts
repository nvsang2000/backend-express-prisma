import { Response } from "express";
import { MESSAGE_ERR, RESPONSE_CODE } from "./constant";

export const ResponseSuccess = (res: Response, content: any) =>
  res.status(200).json({
    code: RESPONSE_CODE.SUCCESS,
    message: MESSAGE_ERR.SUCCESS,
    content,
  });

export const ResponseFailed = (res: Response, message: string) =>
  res.status(400).json({ message });

export const AuthenticationFailed = (res: Response) =>
  res.status(401).json({
    code: RESPONSE_CODE.AUTH_FAILED,
    message: MESSAGE_ERR.AUTH_FAILED,
  });

export const ForbiddenAccess = (res: Response) =>
  res.status(403).json({
    code: RESPONSE_CODE.FORBIDDEN,
    message: MESSAGE_ERR.FORBIDDEN_ACCESS,
  });

export const SystemError = (res: Response, error: any) => {
  console.log(error);
  res.status(500).json({
    code: RESPONSE_CODE.SYS_ERR,
    message: MESSAGE_ERR.SYS_ERROR,
  });
};
