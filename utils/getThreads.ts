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
