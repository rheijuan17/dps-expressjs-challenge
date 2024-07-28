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

	async updateReport(id: string, report: Report) {
		const nonEmptyEntries = Object.entries(report).filter(
			([key, value]) => value !== '' && key != 'id',
		);

		const _report = nonEmptyEntries.reduce((acc, [key, value]) => {
			acc[key as keyof Report] = value;
			return acc;
		}, {} as Partial<Report>);

		const parameters = Object.keys(_report)
			.map((key) => `${key} = :${key}`)
			.join(', ');

		const query = `UPDATE reports SET ${parameters} WHERE id = :id`;
		return db.run(query, { ..._report, id });
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
