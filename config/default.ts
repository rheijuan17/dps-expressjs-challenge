import dotenv from 'dotenv';

dotenv.config();

const config = {
	PORT: process.env.PORT || 3000,
	AUTHORIZATION_TOKEN: process.env.AUTHORIZATION_TOKEN || 'Password123',
	WORD_THRESHOLD: process.env.WORD_THRESHOLD || 3,
};

export default config;
