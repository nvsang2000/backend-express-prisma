import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import adminUserRoter from './routes/admin/user';
import adminRouter from './routes/admin/index';

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel');
});
app.use('/api/admin/users', adminUserRoter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
