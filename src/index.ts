import 'dotenv/config';
import express from 'express';

import userRouter from '~/routes/users.routes';
import databaseService from './services/database.services';
import { defaultErrorHandler } from './middlewares/error.middlewares';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRouter);
databaseService.connect();
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
