import { Card } from '@/components';

type Threads = {
	id: string;
	authorImage: string;
	image: string | null;
	captions: string;
	userId: string | null;
	authorName: string;
	createdAt: string;
};

const getThreads = async () => {
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

export default async function Home() {
	const threads = await getThreads();

	return (
		<main className='w-full h-screen  overflow-y-auto p-5'>
			<section className='flex flex-col gap-5 pb-20'>
				{threads?.map((thread) => (
					<Card
						authorLogo={thread.authorImage ?? ''}
						authorName={thread.authorName}
						captions={thread.captions}
						key={thread.id}
					/>
				))}
			</section>
		</main>
	);
}
