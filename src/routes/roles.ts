import express, { Request, Response } from 'express';
import { createRole } from './neo4j';

const rolesRouter = express.Router();

rolesRouter.post('/', async (req: Request, res: Response) => {
  const { name, accesses } = req.body;
  try {
    await createRole(name, accesses);
    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Failed to create role' });
  }
});

export default rolesRouter;
