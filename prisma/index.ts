import { PrismaClient } from './client';

export default new PrismaClient({
	log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : undefined,
});
