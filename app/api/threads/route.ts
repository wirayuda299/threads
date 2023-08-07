import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

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
		return NextResponse.json({
			message: 'Thread successfully created',
			status: 200,
		});
	} catch (error: any) {
		return NextResponse.json({ message: error.message });
	}
}
