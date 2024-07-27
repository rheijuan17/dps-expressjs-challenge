import { Request, Response, NextFunction } from 'express';
import config from '../../config/default';

function authenticate(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (authorization === config.AUTHORIZATION_TOKEN) {
		return next();
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
}

export default authenticate;
