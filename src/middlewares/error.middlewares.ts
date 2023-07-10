import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';

import HTTP_STATUS from '~/constants/httpStatus';

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || HTTP_STATUS.BAD_REQUEST).json(omit(err, 'status'));
};
