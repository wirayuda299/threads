import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './utils/getSession';

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;

	const session = await getSession(req);

	if (!session && path === '/') {
		return NextResponse.redirect(new URL('/register', req.url));
	}
	return NextResponse.next();
}
export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
