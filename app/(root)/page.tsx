import { Card } from '@/components/index';
import { getThreads } from '@/actions/thread.action';

export const revalidate = 0;

export default async function Home() {
	const threads = await getThreads();

	return (
		<section className=' flex h-full min-h-screen w-full flex-col gap-5 overflow-y-auto px-5 pb-44 pt-5'>
			{threads.map((thread) => (
				<Card {...thread} key={thread.id} comments={thread.comments} />
			))}
		</section>
	);
}
