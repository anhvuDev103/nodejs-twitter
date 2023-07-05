import { Request, Response } from 'express';
import User from '~/models/schemas/User.schema';
import databaseService from '~/services/database.services';
import usersService from '~/services/users.services';
import { ParamsDictionary } from 'express-serve-static-core';

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === 'abc@gmail.com' && password === 'password') {
    return res.json({
      message: 'Login successful'
    });
  }

  return res.status(400).json({
    error: 'Login failed!'
  });
};

export const registerController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  try {
    const result = await usersService.register(req.body);
    return res.json({
      error: 'Register successful!',
      result
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Register failed!',
      error
    });
  }
};
