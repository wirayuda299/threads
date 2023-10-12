import { Suspense } from 'react';

import { Loader, Card } from '@/components/index';
import { getThreads } from '@/actions/thread.action';
import { ScrollArea } from '@/components/ui/scroll-area';

export const revalidate = 0;

export default async function Home() {
	const threads = await getThreads();

	return (
		<ScrollArea className=' max-h-full w-full flex-1 px-8 pb-24 pt-8'>
			{threads.map((thread) => (
				<Suspense key={thread.id} fallback={<Loader />}>
					<Card {...thread} comments={thread.comments} />
				</Suspense>
			))}
		</ScrollArea>
	);
}
