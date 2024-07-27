import express, { Express } from 'express';
import dotenv from 'dotenv';
import projects from './routes/projects.routes';
import reports from './routes/reports.routes';
import config from '../config/default';

dotenv.config();

const app: Express = express();
const port = Number(config.PORT);

app.use(express.json());

// Initialize routes
app.use('/projects', projects);
app.use('/reports', reports);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
