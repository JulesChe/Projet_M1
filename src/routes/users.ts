import express, { Request, Response } from 'express';
import { createUser } from './neo4j';

const usersRouter = express.Router();

usersRouter.post('/', async (req: Request, res: Response) => {
  const { username, password, fullName, roleName } = req.body;
  try {
    await createUser(username, password, fullName, roleName);
    res.status(201).json({ message: 'User successfully created' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default usersRouter;
