import LogOut from './profile/logout';
import { Card } from '@/components';
import prisma from '@/lib/prisma';

export default async function Home() {
	const threads = await prisma.thread.findMany({
		orderBy: { createdAt: 'desc' },
	});

	return (
		<main className='w-full h-screen overflow-y-auto p-5'>
			<LogOut />
			<section className='flex flex-col gap-5 h-full'>
				{threads.map((thread) => (
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
