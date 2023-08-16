import { Card } from '@/components';
import { getThreads } from '@/utils';

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
