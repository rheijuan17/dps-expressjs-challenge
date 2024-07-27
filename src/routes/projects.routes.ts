import express from 'express';
import { ProjectController } from '../controllers/projects.controller';

const router = express.Router();
const projectController = new ProjectController();

router.get('', (req, res) => {
	projectController.getAllProjects(res);
});
router.get('/:id', (req, res) => {
	projectController.getProject(req, res);
});
router.post('', (req, res) => {
	projectController.createProject(req, res);
});
router.patch('/:id', (req, res) => {
	projectController.updateProject(req, res);
});
router.delete('/:id', (req, res) => {
	projectController.deleteProject(req, res);
});

export default router;
