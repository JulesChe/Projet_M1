import express, { Express } from 'express';
import rolesRouter from './routes/roles';
import usersRouter from './routes/users';

const app: Express = express();

app.use(express.json());
app.use('/api/roles', rolesRouter);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
