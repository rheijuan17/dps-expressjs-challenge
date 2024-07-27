import express from 'express';
import { ReportController } from '../controllers/reports.controller';
import authenticate from '../middleware/authenticate';

const router = express.Router();
const reportController = new ReportController();

router.get('', authenticate, (req, res) => {
	reportController.getAllReports(req, res);
});
router.get('/:id', authenticate, (req, res) => {
	reportController.getReport(req, res);
});
router.post('', authenticate, (req, res) => {
	reportController.createReport(req, res);
});
router.patch('/:id', authenticate, (req, res) => {
	reportController.updateReport(req, res);
});
router.delete('/:id', authenticate, (req, res) => {
	reportController.deleteReport(req, res);
});

export default router;
