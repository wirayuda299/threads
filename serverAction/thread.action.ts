'use server';
import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';
import prisma from '@/lib/prismaClient';

export async function createThread(data: FormData) {
	try {
		const captions = data.get('captions') as string;

		const user: User | null = await currentUser();

		if (user === null) throw new Error('You must login to create thread');

		await prisma?.thread.create({
			data: {
				authorImage: user?.imageUrl!,
				captions,
				authorName: user?.firstName as string,
				createdAt: Date.now().toString(),
				userId: user?.id,
			},
		});
	} catch (error) {
		console.log(error);
	}
}
