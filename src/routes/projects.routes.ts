import express from 'express';
import { ProjectController } from '../controllers/projects.controller';
import authenticate from '../middleware/authenticate';

const router = express.Router();
const projectController = new ProjectController();

router.get('', authenticate, (req, res) => {
	projectController.getAllProjects(res);
});
router.get('/:id', authenticate, (req, res) => {
	projectController.getProject(req, res);
});
router.post('', authenticate, (req, res) => {
	projectController.createProject(req, res);
});
router.patch('/:id', authenticate, (req, res) => {
	projectController.updateProject(req, res);
});
router.delete('/:id', authenticate, (req, res) => {
	projectController.deleteProject(req, res);
});

export default router;
