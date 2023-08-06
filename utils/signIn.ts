import { signIn } from 'next-auth/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export const signInUser = async (
	email: string,
	password: string,
	{ push }: AppRouterInstance
) => {
	await signIn('credentials', {
		redirect: false,
		email,
		password,
	}).then(() => push('/'));
};
