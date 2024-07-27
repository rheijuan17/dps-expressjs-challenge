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

	async getReportsByProjectId(id: string) {
		const query = 'SELECT * FROM reports WHERE projectid = :id';
		return db.query(query, { id });
	}

	async createReport(report: Report) {
		const query = 'INSERT INTO reports VALUES (:id, :text, :projectid)';
		return db.run(query, { ...report });
	}

	async updateReportText(id: string, text: string) {
		const query = 'UPDATE reports SET text = :text WHERE id = :id';
		return db.run(query, { text, id });
	}

	async updateReportProjectId(id: string, projectId: string) {
		const query =
			'UPDATE reports SET projectId = :projectId WHERE id = :id';
		return db.run(query, { projectId, id });
	}

	async updateReport(id: string, text: string, projectId: string) {
		const query =
			'UPDATE reports SET text = :text, projectId = :projectId WHERE id = :id';
		return db.run(query, { text, projectId, id });
	}

	async deleteReport(id: string) {
		const query = 'DELETE FROM reports WHERE id = :id';
		return db.run(query, { id });
	}

	async deleteByProjectId(projectid: string) {
		const query = 'DELETE FROM reports WHERE projectid = :projectid';
		return db.run(query, { projectid });
	}
}

export default ReportRepository;
