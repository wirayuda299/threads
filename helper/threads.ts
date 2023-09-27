'use server';

import prisma from '@/lib/prismaClient';
import { Thread } from '@/types/threads';
import { currentUser } from '@clerk/nextjs';

export async function getThreads(): Promise<Thread[]> {
	try {
		const threads = await prisma?.thread.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
		return threads;
	} catch (error) {
		throw error;
	}
}

export async function like(postId: string) {
	try {
		const user = await currentUser();

		if (!user) throw new Error('You must login to perform this action');

		const thread = await prisma.thread.findFirst({
			where: {
				id: postId,
			},
		});
		const isLikedByCurrentUser = thread?.likes.includes(user.id);
		if (isLikedByCurrentUser) {
			await prisma.thread.update({
				where: {
					id: thread?.id,
				},
				data: {
					likes: {
						set: thread?.likes.filter((id) => id !== user.id),
					},
				},
			});
		} else {
			await prisma.thread.update({
				where: {
					id: thread?.id,
				},
				data: {
					likes: {
						push: user.id,
					},
				},
			});
		}
	} catch (error) {
		throw error;
	}
}

export const getThreadById = async (id: string) => {
	try {
		const thread = await prisma?.thread.findFirst({
			where: {
				id,
			},
		});

		if (!thread) throw new Error('Thread not found');
		return thread;
	} catch (error) {
		throw error;
	}
};
