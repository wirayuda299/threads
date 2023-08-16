import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { AuthOptions, Session } from 'next-auth';
import { compare } from 'bcrypt';
import { JWT } from 'next-auth/jwt';

export const options: AuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { email, password } = credentials ?? {};
				if (!email || !password) {
					throw new Error('Missing username or password');
				}
				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});
				// if user doesn't exist or password doesn't match
				if (!user || !(await compare(password, user.password))) {
					throw new Error('Invalid username or password');
				}
				return user;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, token }: { session: Session; token: JWT }) {
			if (session && session.user) {
				session.user.username = session.user.username;
				session.user.uid = token.sub as string;
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};
