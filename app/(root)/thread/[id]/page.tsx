import { notFound } from 'next/navigation';

import { Card, CommentForm } from '@/components/index';
import { getThreadById } from '@/lib/actions/thread.action';

type Params = {
	params: {
		id: string;
	};
};

export const revalidate = 0;

export default async function ThreadDetail({ params: { id } }: Params) {
	const thread = await getThreadById(id);

	if (!thread) return notFound();

	return (
		<div className='min-h-screen w-full flex-1 overflow-y-auto px-8 pb-24 pt-8'>
			<Card type='thread' {...thread} key={thread.id} />
			<section className='mt-8 border-y border-main py-5'>
				<CommentForm id={id} />
			</section>
			<section className='mt-7 flex flex-col gap-5'>
				{thread?.comments.map((comment) => (
					<Card type='comment' {...thread} key={comment.id} />
				))}
			</section>
		</div>
	);
}
