import { PrismaClient } from './client';

export default new PrismaClient({
	log: ['query', 'info', 'warn', 'error'],
});
