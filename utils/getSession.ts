import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export const getSession = async (req: NextRequest) => {
	const session = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
	});
	return session;
};
