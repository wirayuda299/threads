import { Suspense } from 'react';

import { Card, Comment, Loader } from '@/components/index';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getThreadById } from '@/helper/threads';

type Params = {
	params: {
		id: string;
	};
};

export default async function ThreadDetail({ params: { id } }: Params) {
	const thread = await getThreadById(id);

	return (
		<ScrollArea className=' max-h-full w-full flex-1 px-8 pb-24 pt-8'>
			<Suspense fallback={<Loader />}>
				<Card {...thread} />
			</Suspense>
			<section className='mt-8 border-y border-main py-5'>
				<Comment />
			</section>
		</ScrollArea>
	);
}
