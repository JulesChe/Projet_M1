import express, { Request, Response } from 'express';
import { createRole, updateRole, roleExists } from './neo4j'; // Import de la fonction roleExists

const rolesRouter = express.Router();

// Route POST pour créer un rôle
rolesRouter.post('/', async (req: Request, res: Response) => {
  const { name, accesses } = req.body;

  try {
    const exists = await roleExists(name);
    if (exists) {
       res.status(400).json({ error: 'Role already exists' });
    }

    await createRole(name, accesses);
    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Failed to create role' });
  }
});

rolesRouter.post('/update', async (req: Request, res: Response): Promise<any> => {
  const { name, accesses } = req.body;

  try {
    const exists = await roleExists(name);
    if (!exists) {
       res.status(404).json({ error: 'Role does not exist' });
    }

    await updateRole(name, accesses);
     res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error updating role:', error);
     res.status(500).json({ error: 'Failed to update role' });
  }
  return res;
});

export default rolesRouter;
