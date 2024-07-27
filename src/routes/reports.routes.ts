import express from 'express';
import { ReportController } from '../controllers/reports.controller';

const router = express.Router();
const reportController = new ReportController();

router.get('', (req, res) => {
	reportController.getAllReports(req, res);
});
router.get('/:id', (req, res) => {
	reportController.getReport(req, res);
});
router.post('', (req, res) => {
	reportController.createReport(req, res);
});
router.patch('/:id', (req, res) => {
	reportController.updateReport(req, res);
});
router.delete('/:id', (req, res) => {
	reportController.deleteReport(req, res);
});

export default router;
