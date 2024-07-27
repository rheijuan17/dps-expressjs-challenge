import db from '../services/db.service';
import { Report } from '../models/Report';

class ReportRepository {
	async getAllReports() {
		const query = 'SELECT * FROM reports';
		return db.query(query);
	}

	async getReportById(id: string) {
		const query = 'SELECT * FROM reports WHERE id = :id';
		return db.query(query, { id });
	}

	async getReportByProjectId(id: string) {
		const query = 'SELECT * FROM reports WHERE project_id = :id';
		return db.query(query, { id });
	}

	async createReport(report: Report) {
		const query = 'INSERT INTO reports VALUES (:id, :text, :projectId)';
		return db.run(query, { ...report });
	}

	async updateReportText(text: string, id: string) {
		const query = 'UPDATE reports SET text = :text WHERE id = :id';
		return db.run(query, { text, id });
	}

	async updateReportProjectId(projectId: string, id: string) {
		const query =
			'UPDATE reports SET projectId = :projectId WHERE id = :id';
		return db.run(query, { projectId, id });
	}

	async updateReport(text: string, projectId: string, id: string) {
		const query =
			'UPDATE reports SET text = :text, projectId = :projectId WHERE id = :id';
		return db.run(query, { text, projectId, id });
	}

	async deleteReport(id: string) {
		const query = 'DELETE FROM reports WHERE id = :id';
		return db.run(query, { id });
	}
}

export default ReportRepository;
