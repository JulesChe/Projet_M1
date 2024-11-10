import express, { Express } from 'express';
import rolesRouter from './routes/roles';

const app: Express = express();

app.use(express.json());
app.use('/api/roles', rolesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
