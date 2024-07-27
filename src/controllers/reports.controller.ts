import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import ReportRepository from '../repositories/reports.repository';
import { Report } from '../models/Report';

export class ReportController {
	reportRepository: ReportRepository;

	constructor() {
		this.reportRepository = new ReportRepository();
	}

	async getAllReports(req: Request, res: Response): Promise<void> {
		let reports;
		const projectid = req.query.projectid as string;
		if (projectid) {
			reports =
				await this.reportRepository.getReportsByProjectId(projectid);
		} else {
			reports = await this.reportRepository.getAllReports();
		}

		res.status(200).json(reports);
	}

	async getReport(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const [report] = await this.reportRepository.getReportById(id);

		res.status(200).json(report);
	}

	async createReport(req: Request, res: Response): Promise<void> {
		const { text, projectid } = req.body;
		const id = uuid();
		const report = new Report(id, text, projectid);

		await this.reportRepository.createReport(report);
		res.status(201).json();
	}

	async updateReport(req: Request, res: Response): Promise<void> {
		const { text, projectid } = req.body;
		const { id } = req.params;

		if (text && projectid) {
			await this.reportRepository.updateReport(id, text, projectid);
		} else if (text) {
			await this.reportRepository.updateReportText(id, text);
		} else {
			await this.reportRepository.updateReportProjectId(id, projectid);
		}

		res.status(204).json();
	}

	async deleteReport(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		await this.reportRepository.deleteReport(id);

		res.status(204).json();
	}
}
