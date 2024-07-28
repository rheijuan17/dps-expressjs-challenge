import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import ProjectRepository from '../repositories/projects.repository';
import { Project } from '../models/Project';
import logger from './../util/logger';

export class ProjectController {
	projectRepository: ProjectRepository;

	constructor() {
		this.projectRepository = new ProjectRepository();
	}

	async getAllProjects(res: Response): Promise<void> {
		logger.info(`Retrieving all projects`);

		try {
			const projects =
				(await this.projectRepository.getAllProjects()) as Project[];
			res.status(200).json(projects);
			logger.info(`Successfully retrieved all projects`);
		} catch (error) {
			logger.error(
				`Failed to retrieve projects due to: ${JSON.stringify(error)}`,
			);
			res.status(500).json({ error: `Failed to retrieve projects` });
		}
	}

	async getProject(req: Request, res: Response): Promise<void> {
		const projectId = req.params.id;

		logger.info(`Retrieving project with id ${projectId}`);

		try {
			const [project] = (await this.projectRepository.getProjectById(
				projectId,
			)) as Project[];

			if (!project) {
				logger.error(`Project does not exist`);
				res.status(404).json({ error: 'Project not found' });
				return;
			}

			res.status(200).json(project);
			logger.info(`Successfully retrieved project`);
		} catch (error) {
			logger.error(
				`Failed to retrieve project due to: ${JSON.stringify(error)}`,
			);
			res.status(500).json({ error: `Failed to retrieve project` });
		}
	}

	async createProject(req: Request, res: Response): Promise<void> {
		logger.info(`Creating project`);

		const { name, description } = req.body;
		const project = new Project(uuid(), name, description);

		try {
			await this.projectRepository.createProject(project);
			res.status(201).json(project);
			logger.info(`Successfully created project`);
		} catch (error) {
			logger.error(
				`Failed to create project due to: ${JSON.stringify(error)}`,
			);
			res.status(500).json({ error: `Failed to create project` });
		}
	}

	async updateProject(req: Request, res: Response): Promise<void> {
		logger.info(`Updating project with id: ${req.params.id}`);

		const project = new Project(
			req.params.id,
			req.body.name,
			req.body.description,
		);

		try {
			if (!(await this.validateProject(req.params.id))) {
				logger.error(`Project does not exist`);
				res.status(404).json({ error: 'Project not found' });
				return;
			}

			await this.projectRepository.updateProject(req.params.id, project);
			res.status(204).json();
			logger.info(`Successfully updated project`);
		} catch (error) {
			logger.error(
				`Failed to update project due to: ${JSON.stringify(error)}`,
			);
			res.status(500).json({ error: `Failed to update project` });
		}
	}

	async deleteProject(req: Request, res: Response): Promise<void> {
		const projectId = req.params.id;

		logger.info(`Deleting project with id: ${projectId}`);

		try {
			if (!(await this.validateProject(req.params.id))) {
				logger.error(`Project does not exist`);
				res.status(404).json({ error: 'Project not found' });
				return;
			}

			await this.projectRepository.deleteProject(projectId);
			res.status(204).json();
			logger.info(`Successfully deleted project`);
		} catch (error) {
			logger.error(
				`Failed to delete project due to: ${JSON.stringify(error)}`,
			);
			res.status(500).json({ error: `Failed to delete project` });
		}
	}

	async validateProject(projectid: string): Promise<boolean> {
		const [project] =
			await this.projectRepository.getProjectById(projectid);
		if (!project) {
			return Promise.resolve(false);
		}

		return Promise.resolve(true);
	}
}
