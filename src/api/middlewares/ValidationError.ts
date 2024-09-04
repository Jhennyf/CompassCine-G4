// import { Request, Response, NextFunction } from "express";
// import { errors } from 'celebrate';
// import AppError from "./AppError";
// import "express-async-errors";

// public class MiddlewareValidation
// {
//     public ValidationError((error: Error, req: Request, res: Response, next: NextFunction) => {
//         if (error instanceof AppError) {
//           return res.status(error.statusCode).json({
//             status: 'error',
//             message: error.message,
//           });
//         }
//         return res.status(500).json({
//           status: 'error',
//           message: 'Internal server error',
//         });
//       });

// };
