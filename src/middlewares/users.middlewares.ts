import { NextFunction, Request, Response } from 'express';

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  console.log('>> Check | req.body:', req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: 'Please provide email and password'
    });
  }
  next();
};
