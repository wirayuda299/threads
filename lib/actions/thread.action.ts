'use server';

import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import prisma from '@/prisma';

export async function getThreads(page: number = 1) {
	try {
		const totalPosts = await prisma.thread.count();
		const totalPages = Math.ceil(totalPosts / 10);

		const threads = await prisma?.thread.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			take: 10,
			skip: (page - 1) * 10,
			include: {
				comments: {
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});
		return { threads, totalPages };
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
			where: { id },
			include: {
				comments: true,
				_count: true,
			},
		});

		if (!thread) throw new Error('Thread not found');
		return thread;
	} catch (error) {
		throw error;
	}
};

export const postComments = async (comment: string, id: string) => {
	try {
		const user = await currentUser();
		if (!user) throw new Error('You must login to perform this action');

		if (comment === '') return;

		await prisma.comment.create({
			data: {
				authorImage: user.imageUrl,
				authorName:
					user.username! ??
					user.firstName! ??
					user.lastName ??
					user.emailAddresses[0].emailAddress,
				threadId: id,
				comment,
			},
		});
	} catch (error) {
		throw error;
	}
};
export async function createThread(caption: string) {
	try {
		const user: User | null = await currentUser();

		if (user === null) throw new Error('You must login to create thread');

		await prisma?.thread.create({
			data: {
				authorImage: user?.imageUrl!,
				captions: caption,
				authorName: user?.firstName as string,
				createdAt: Date.now().toString(),
				userId: user?.id,
			},
		});
		revalidatePath('/');
	} catch (error) {
		throw error;
	}
}
