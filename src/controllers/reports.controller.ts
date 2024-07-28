import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import ReportRepository from '../repositories/reports.repository';
import ProjectRepository from '../repositories/projects.repository';
import { Report } from '../models/Report';
import config from '../../config/default';

export class ReportController {
	reportRepository: ReportRepository;
	projectRepository: ProjectRepository;

	constructor() {
		this.reportRepository = new ReportRepository();
		this.projectRepository = new ProjectRepository();
	}

	async getAllReports(req: Request, res: Response): Promise<void> {
		const projectid = req.query.projectid as string;
		let targetWord = req.query.targetWord as string;
		let reports;

		if (projectid) {
			reports = (await this.reportRepository.getReportsByProjectId(
				projectid,
			)) as Report[];
		} else {
			reports = (await this.reportRepository.getAllReports()) as Report[];
			if (targetWord) {
				targetWord = targetWord.toLowerCase();
				reports = reports.reduce<Report[]>((result, report) => {
					if (!report.text) {
						return result;
					}

					const paragraph = report.text
						.toLowerCase()
						.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
					const words = paragraph?.split(/\s+/);
					const wordCount = words?.filter(
						(word) => word === targetWord,
					).length;

					if (wordCount >= Number(config.WORD_THRESHOLD)) {
						result.push(report);
					}

					return result;
				}, []);
			}
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

		if (!projectid) {
			res.status(400)
				.json({ error: "Incomplete Parameters: ['projectid']" })
				.send();
			return;
		}

		const [project] =
			await this.projectRepository.getProjectById(projectid);

		if (!project) {
			res.status(400)
				.json({ error: "Invalid Parameters: ['projectid']" })
				.send();
			return;
		}

		const id = uuid();
		const report = new Report(id, text, projectid);

		await this.reportRepository.createReport(report);
		res.status(201).json(report);
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
		const projectid = req.query.projectid as string;

		if (projectid) {
			await this.reportRepository.deleteByProjectId(projectid);
		} else {
			await this.reportRepository.deleteReport(id);
		}

		res.status(204).json();
	}
}
