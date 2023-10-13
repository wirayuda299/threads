import Image from 'next/image';

import { Comments } from '@/types/comments';

type CommentCardProps = {
	authorImage: string;
	authorName: string;
	comment: Comments;
};

export default async function CommentCard({
	authorImage,
	authorName,
	comment,
}: CommentCardProps) {
	return (
		<div className='overflow-hidden rounded-lg bg-main p-5'>
			<div className='flex h-full justify-start gap-4'>
				<div className=' flex min-w-[50px] flex-col items-center'>
					<Image
						className='mb-2 h-12 w-12 rounded-full'
						src={authorImage}
						width={40}
						height={40}
						priority
						fetchPriority='high'
						alt='logo'
					/>
					<div className='h-28 w-0.5 bg-gray-600 '></div>
				</div>
				<div className='flex flex-col'>
					<h2 className='text-xl font-semibold'>{authorName}</h2>
					<p className='mb-auto max-w-lg flex-1 py-2 text-sm text-gray-200'>
						{comment.comments}
					</p>
				</div>
			</div>
		</div>
	);
}
