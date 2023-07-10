import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';
import HTTP_STATUS from '~/constants/httpStatus';
import { EntityError, ErrorWithStatus } from '~/models/Errors';

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req);
    const errors = validationResult(req);
    //No errors -> next()
    if (errors.isEmpty()) {
      return next();
    }
    //Oops, has errors
    const errorsObject = errors.mapped();
    const entityError = new EntityError({ errors: {} });

    for (const key in errorsObject) {
      const { msg } = errorsObject[key];
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENITY) {
        return next(msg);
      }
      entityError.errors[key] = errorsObject[key];
    }

    next(entityError);
  };
};
