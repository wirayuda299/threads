import Image from 'next/image';
import parse from 'html-react-parser';
import ActionButton from './ActionButtons';
import { Comment } from '@prisma/client';

type CommentWithoutCreatedAt = Omit<Comment, 'createdAt'>;

type CardProps = {
	captions: string;
	authorName: string;
	authorImage: string;
	id: string;
	likes: string[];
	comments: CommentWithoutCreatedAt[];
	type: 'thread' | 'comment';
};

export default function Card({
	captions,
	authorImage,
	authorName,
	id,
	likes,
	comments,
	type,
}: CardProps) {
	return (
		<article className='rounded-lg bg-main p-5'>
			<div className='flex justify-start gap-4'>
				<header className=' flex min-w-[50px] flex-col items-center'>
					<Image
						className='mb-2 h-12 w-12 rounded-full'
						src={authorImage}
						width={40}
						height={40}
						priority
						fetchPriority='high'
						alt='logo'
					/>
					<div className='h-[calc(100%-100px)] w-0.5 bg-gray-600 '></div>
					{comments.length >= 1 && (
						<div className=' flex w-full justify-center gap-1'>
							{comments?.slice(0, 2).map((comment, i) => (
								<Image
									className={`h-9 w-9 rounded-full object-contain ${
										i > 0 ? '-translate-x-4' : ''
									}`}
									src={comment.authorImage}
									width={40}
									height={40}
									alt='logo'
									key={comment.id}
								/>
							))}
						</div>
					)}
				</header>
				<div className='flex flex-col'>
					<h2 className='text-xl font-semibold'>{authorName}</h2>
					<div className='mb-auto w-full prose'>
						<div className='prose-p:text-gray-200 prose-img:w-full prose-img:object-contain prose-strong:text-gray-200 prose-h2:font-semibold prose-h2:text-lg flex-1 py-2 text-sm prose-ul:text-gray-200 prose-li:text-gray-200 prose-code:text-inherit prose-a:text-blue-600'>
							{parse(captions)}
						</div>
					</div>
					<div className='min-h-min'>
						{comments.length > 0 && (
							<p className='flex items-center justify-start gap-1 text-xs text-gray-500'>
								<span>{comments.length}</span> <span> replies</span>
							</p>
						)}
						<ActionButton id={id} likes={likes} type={type} />
					</div>
				</div>
			</div>
		</article>
	);
}
