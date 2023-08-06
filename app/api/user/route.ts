import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function POST(req: Request, res: Response) {
	await prisma?.user.create({
		data: {
			email: 'wirayuda233@gmail.com',
			name: 'wira',
			id: 1,
		},
	});
	return NextResponse.json({ message: 'success' });
}
