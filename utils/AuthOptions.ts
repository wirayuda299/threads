import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { AuthOptions } from 'next-auth';
import { compare } from 'bcrypt';

export const options: AuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			// @ts-ignore
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
	pages: {
		signIn: '/login',
	},
};
