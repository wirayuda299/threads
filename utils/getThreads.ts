type Threads = {
	id: string;
	authorImage: string;
	image: string | null;
	captions: string;
	userId: string | null;
	authorName: string;
	createdAt: string;
};

export const getThreads = async () => {
	try {
		const base = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
		const res = await fetch(`${base}/api/threads`, {
			cache: 'no-store',
		});

		const threads = (await res.json()) as Threads[];
		return threads;
	} catch (error) {
		console.error(error);
	}
};

export const getThreadsByCurrentUser = async (username: string) => {
	try {
		if (!username) throw new Error('Username is required');

		const res = await prisma?.thread.findMany({
			where: {
				authorName: username,
			},
		});
		return res;
	} catch (error) {
		console.log(error);
	}
};
