import db from '../services/db.service';
import { Project } from '../models/Project';

class ProjectRepository {
	async getAllProjects() {
		const query = 'SELECT * FROM projects';
		return db.query(query);
	}

	async getProjectById(id: string) {
		const query = 'SELECT * FROM projects WHERE id = :id';
		return db.query(query, { id });
	}

	async createProject(project: Project) {
		const query = 'INSERT INTO projects VALUES (:id, :name, :description)';
		return db.run(query, { ...project });
	}

	async updateProject(id: string, project: Project) {
		const nonEmptyEntries = Object.entries(project).filter(
			([key, value]) => value !== '' && key != 'id',
		);

		const _project = nonEmptyEntries.reduce((acc, [key, value]) => {
			acc[key as keyof Project] = value;
			return acc;
		}, {} as Partial<Project>);

		const parameters = Object.keys(_project)
			.map((key) => `${key} = :${key}`)
			.join(', ');

		const query = `UPDATE projects SET ${parameters} WHERE id = :id`;
		return db.run(query, { ..._project, id });
	}

	async deleteProject(id: string) {
		const query = 'DELETE FROM projects WHERE id = :id';
		return db.run(query, { id });
	}
}

export default ProjectRepository;
