import { NextFunction, Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import databaseService from '~/services/database.services';
import { validate } from '~/utils/validation';
import usersService from '~/services/users.services';
import { ErrorWithStatus } from '~/models/Errors';

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: 'Please provide email and password'
    });
  }
  next();
};

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 5,
          max: 20
        }
      }
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isExistedEmail = await usersService.checkEmailExisted(value);
          if (isExistedEmail) {
            // throw new ErrorWithStatus({ status: 401, message: 'Email already existed' });
            throw new Error('Email already existed');
          }
          return true;
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 6,
          max: 24
        }
      },
      isStrongPassword: {
        options: {
          minLength: 6
        },
        errorMessage: 'Password too weak!'
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 6,
          max: 24
        }
      },
      isStrongPassword: {
        options: {
          minLength: 6
        }
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmed does not match');
          }
          return true;
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
);
