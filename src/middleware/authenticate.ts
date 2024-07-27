import { Request, Response, NextFunction } from 'express';

function authenticate(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (authorization === 'Password123') {
		return next();
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
}

export default authenticate;
