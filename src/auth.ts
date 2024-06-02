import prisma from '@/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Google({ allowDangerousEmailAccountLinking: true }),
		GitHub({ allowDangerousEmailAccountLinking: true }),
	],
	callbacks: {
		// @ts-ignore
		session({ session, user }) {
			session.user.role = user.role;
			return session;
		},
	},
});

declare module 'next-auth' {
	interface Session {
		user?: {
			name?: string | null;
			email?: string | null;
			image?: string | null;
			role?: string | null;
		};
	}

	interface User {
		role?: string;
	}
}
