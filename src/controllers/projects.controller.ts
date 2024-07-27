import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import ProjectRepository from '../repositories/projects.repository';
import { Project } from '../models/Project';

export class ProjectController {
	projectRepository: ProjectRepository;

	constructor() {
		this.projectRepository = new ProjectRepository();
	}

	async getAllProjects(res: Response): Promise<void> {
		const projects = await this.projectRepository.getAllProjects();

		res.status(200).json(projects);
	}

	async getProject(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const [project] = await this.projectRepository.getProjectById(id);

		res.status(200).json(project);
	}

	async createProject(req: Request, res: Response): Promise<void> {
		const { name, description } = req.body;
		const id = uuid();
		const project = new Project(id, name, description);

		await this.projectRepository.createProject(project);
		res.status(201).json();
	}

	async updateProject(req: Request, res: Response): Promise<void> {
		const { name, description } = req.body;
		const { id } = req.params;

		if (name && description) {
			await this.projectRepository.updateProject(id, name, description);
		} else if (name) {
			await this.projectRepository.updateProjectName(id, name);
		} else {
			await this.projectRepository.updateProjectDescription(
				id,
				description,
			);
		}

		res.status(204).json();
	}

	async deleteProject(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		await this.projectRepository.deleteProject(id);

		res.status(204).json();
	}
}
