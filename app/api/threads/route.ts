import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET() {
	try {
		const threads = await prisma.thread.findMany();
		return NextResponse.json(threads);
	} catch (error) {
		return NextResponse.json(error);
	}
}

export async function POST(req: Request, res: Response) {
	const { email, captions } = await req.json();

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user)
			return NextResponse.json({
				message: 'User with that email is not found',
				status: 404,
			});

		await prisma.thread.create({
			data: {
				authorName: user.username,
				captions,
				createdAt: Date.now().toString(),
				authorImage: user.profileImage as string,
			},
		});
		revalidatePath('/');
		return NextResponse.json({
			message: 'Thread successfully created',
			status: 200,
			revalidated: true,
			now: Date.now(),
		});
	} catch (error: any) {
		return NextResponse.json({ message: error.message });
	}
}
