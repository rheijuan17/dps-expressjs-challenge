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
		const projects =
			(await this.projectRepository.getAllProjects()) as Project[];

		res.status(200).json(projects);
	}

	async getProject(req: Request, res: Response): Promise<void> {
		const [project] = (await this.projectRepository.getProjectById(
			req.params.id,
		)) as Project[];

		res.status(200).json(project);
	}

	async createProject(req: Request, res: Response): Promise<void> {
		const { name, description } = req.body;
		const project = new Project(uuid(), name, description);

		await this.projectRepository.createProject(project);
		res.status(201).json(project);
	}

	async updateProject(req: Request, res: Response): Promise<void> {
		const project = new Project(
			req.params.id,
			req.body.name,
			req.body.description,
		);

		await this.projectRepository.updateProject(req.params.id, project);
		res.status(204).json();
	}

	async deleteProject(req: Request, res: Response): Promise<void> {
		await this.projectRepository.deleteProject(req.params.id);

		res.status(204).json();
	}
}
