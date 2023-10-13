import { Card, Comment, CommentCard } from '@/components/index';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getThreadById } from '@/actions/thread.action';

type Params = {
	params: {
		id: string;
	};
};

export const revalidate = 0;

export default async function ThreadDetail({ params: { id } }: Params) {
	const thread = await getThreadById(id);
	console.log(thread);

	return (
		<ScrollArea className=' max-h-full w-full flex-1 px-8 pb-24 pt-8'>
			<Card {...thread} comments={thread.comments} />
			<section className='mt-8 border-y border-main py-5'>
				<Comment id={id} />
			</section>
			<section className='mt-7 flex flex-col gap-5'>
				{thread.comments.map((comment) => (
					<CommentCard
						comment={comment}
						comments={thread.comments}
						authorImage={comment.authorImage}
						authorName={comment.authorName}
						key={comment.id}
					/>
				))}
			</section>
		</ScrollArea>
	);
}
