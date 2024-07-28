import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import ReportRepository from '../repositories/reports.repository';
import ProjectRepository from '../repositories/projects.repository';
import { Report } from '../models/Report';
import config from '../../config/default';
import logger from './../util/logger';

export class ReportController {
	reportRepository: ReportRepository;
	projectRepository: ProjectRepository;

	constructor() {
		this.reportRepository = new ReportRepository();
		this.projectRepository = new ProjectRepository();
	}

	async getAllReports(req: Request, res: Response): Promise<void> {
		logger.info(`Retrieving all reports`);

		const projectid = req.query.projectid as string;
		let targetWord = req.query.word as string;
		let reports;

		if (projectid) {
			logger.info(`Retrieving all reports with projectId = ${projectid}`);

			try {
				reports = (await this.reportRepository.getReportsByProjectId(
					projectid,
				)) as Report[];

				if (reports.length === 0) {
					logger.info(
						`No reports found under project = ${projectid}`,
					);
				}
			} catch (error) {
				logger.error(
					`Failed to retrieve reports due to: ${JSON.stringify(error)}`,
				);
				res.status(500).json({
					error: `Failed to retrieve reports`,
				});
			}
		} else {
			try {
				reports =
					(await this.reportRepository.getAllReports()) as Report[];
				if (targetWord) {
					logger.info(
						`Retrieving all reports with the word \'${targetWord}\' appearing at least ${config.WORD_THRESHOLD} times`,
					);
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

					if (reports.length === 0) {
						logger.info(
							`No reports found with repeating word \'${targetWord}\'`,
						);
					}
				}
			} catch (error) {
				logger.error(
					`Failed to retrieve reports due to: ${JSON.stringify(error)}`,
				);
				res.status(500).json({
					error: `Failed to retrieve reports`,
				});
			}
		}

		logger.info(`Successfully retrieved all reports`);
		res.status(200).json(reports);
	}

	async getReport(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		logger.info(`Retrieving report with id ${id}`);

		try {
			const [report] = (await this.reportRepository.getReportById(
				id,
			)) as Report[];

			if (!report) {
				logger.error(`Report does not exist`);
				res.status(404).json({ error: 'Report not found' });
				return;
			}

			res.status(200).json(report);
			logger.info(`Successfully retrieved report`);
		} catch (error) {
			logger.error(
				`Failed to retrieve report due to: ${JSON.stringify(error)}`,
			);
			res.status(500).json({ error: `Failed to retrieve report` });
		}
	}

	async createReport(req: Request, res: Response): Promise<void> {
		logger.info(`Creating report`);

		const { text, projectid } = req.body;

		if (!projectid) {
			res.status(400)
				.json({ error: "Incomplete Parameters: ['projectid']" })
				.send();
			return;
		}

		if (!(await this.validateProject(projectid))) {
			res.status(400)
				.json({ error: "Invalid Parameters: ['projectid']" })
				.send();
			return;
		}

		const id = uuid();
		const report = new Report(id, text, projectid);

		try {
			await this.reportRepository.createReport(report);
			res.status(201).json(report);
			logger.info(`Successfully created report`);
		} catch (error) {
			logger.error(
				`Failed to create report due to: ${JSON.stringify(error)}`,
			);
			res.status(500).json({ error: `Failed to create report` });
		}
	}

	async updateReport(req: Request, res: Response): Promise<void> {
		logger.info(`Updating report with id: ${req.params.id}`);

		const body = req.body;

		if (!(await this.validateReport(req.params.id))) {
			logger.error(`Report does not exist`);
			res.status(404).json({ error: 'Report not found' });
			return;
		}

		if (req.body.projectid) {
			if (!(await this.validateProject(req.body.projectid))) {
				res.status(400).json({
					error: "Invalid Parameters: ['projectid']",
				});
				return;
			}
		}

		try {
			await this.reportRepository.updateReport(req.params.id, body);
			res.status(204).json();
			logger.info(`Successfully updated report`);
		} catch (error) {
			logger.error(
				`Failed to update report due to: ${JSON.stringify(error)}`,
			);
			res.status(500).json({ error: `Failed to update report` });
		}
	}

	async deleteReport(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const projectid = req.query.projectid as string;

		if (id && projectid) {
			logger.error(
				`Only one of Report ID or Project ID should be provided`,
			);
			res.status(400).json({
				error: 'Could only delete by report id or project id',
			});
			return;
		}

		logger.info(`Deleting report/s`);

		if (!(await this.validateReport(id))) {
			logger.error(`Report does not exist`);
			res.status(404).json({ error: 'Report not found' });
			return;
		}

		try {
			if (projectid) {
				logger.info(`Deleting reports with projectid ${projectid}`);
				if (!(await this.validateProject(projectid))) {
					res.status(400).json({
						error: "Invalid Parameters: ['projectid']",
					});
					return;
				}

				await this.reportRepository.deleteByProjectId(projectid);
				logger.info(
					`Successfully deleted reports with projectid ${projectid}`,
				);
			} else {
				await this.reportRepository.deleteReport(id);
				logger.info('Successfully deleted report');
			}

			res.status(204).json();
		} catch (error) {
			logger.error(
				`Failed to delete report due to: ${JSON.stringify(error)}`,
			);
			res.status(500).json({ error: `Failed to delete report` });
		}
	}

	async validateReport(reportId: string): Promise<boolean> {
		const [report] = await this.reportRepository.getReportById(reportId);
		if (!report) {
			return Promise.resolve(false);
		}

		return Promise.resolve(true);
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
