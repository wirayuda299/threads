'use server';

import prisma from '@/lib/prismaClient';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';

import { Thread } from '@/types/threads';

export async function getThreads(): Promise<Thread[]> {
	try {
		const threads = await prisma?.thread.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				comments: true,
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
			include: {
				comments: true,
			},
		});

		if (!thread) throw new Error('Thread not found');
		return thread;
	} catch (error) {
		throw error;
	}
};

export const postComments = async (
	formData: FormData,
	user: User,
	id: string
) => {
	try {
		if (!user) throw new Error('You must login to perform this action');
		const comments = formData.get('comment') as string;

		if (comments === '') return;

		await prisma.comments.create({
			data: {
				createdAt: Date.now().toString(),
				authorImage: user.imageUrl,
				authorName: user.username!,
				threadId: id,
				comments,
			},
		});
	} catch (error) {}
};
