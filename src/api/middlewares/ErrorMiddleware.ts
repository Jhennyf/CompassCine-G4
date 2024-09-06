import { Request, Response, NextFunction } from 'express';
import AppError from '../middlewares/AppError'; 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Error'
  });
};

export default errorMiddleware;

