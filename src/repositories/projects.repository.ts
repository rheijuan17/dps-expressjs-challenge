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

	async updateProjectName(id: string, name: string) {
		const query = 'UPDATE projects SET name = :name WHERE id = :id';
		return db.run(query, { name, id });
	}

	async updateProjectDescription(id: string, description: string) {
		const query =
			'UPDATE projects SET description = :description WHERE id = :id';
		return db.run(query, { description, id });
	}

	async updateProject(id: string, name: string, description: string) {
		const query =
			'UPDATE projects SET name = :name, description = :description WHERE id = :id';
		return db.run(query, { name, description, id });
	}

	async deleteProject(id: string) {
		const query = 'DELETE FROM projects WHERE id = :id';
		return db.run(query, { id });
	}
}

export default ProjectRepository;
