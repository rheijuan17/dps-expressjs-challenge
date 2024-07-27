import express, { Express } from 'express';
import dotenv from 'dotenv';
import projects from './routes/projects.routes';
import reports from './routes/reports.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize routes
app.use('/projects', projects);
app.use('/reports', reports);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
