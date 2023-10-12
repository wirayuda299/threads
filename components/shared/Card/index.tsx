import Image from 'next/image';
import Link from 'next/link';

import ActionButton from './ActionButtons';

type Comments = {
	id: string;
	authorName: string;
	authorImage: string;
	createdAt: string;
	comments: string;
	threadId: string | null;
	likes: string[];
};

type CardProps = {
	captions: string;
	authorName: string;
	authorImage: string;
	id: string;
	likes: string[];
	comments: Comments[];
};

export default function Card({
	captions,
	authorImage,
	authorName,
	id,
	likes,
	comments,
}: CardProps) {
	return (
		<div className=' mt-5 min-h-min flex-1 overflow-hidden rounded-lg bg-main p-5'>
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
					{comments.length >= 1 && (
						<div className=' flex w-full justify-center gap-1'>
							{comments?.slice(0, 2).map((comm, i) => (
								<Image
									className={`h-9 w-9 rounded-full object-contain ${
										i > 0 ? '-translate-x-4' : ''
									}`}
									src={comm.authorImage}
									width={40}
									height={40}
									alt='logo'
									key={comm.id}
								/>
							))}
						</div>
					)}
				</div>
				<div className='flex  flex-col'>
					<h2 className='text-xl font-semibold'>{authorName}</h2>
					<p
						className='mb-auto max-w-lg flex-1 py-2 text-sm text-gray-200'
						title={captions}
					>
						{captions.length > 200 ? `${captions.slice(0, 150)}....	` : captions}

						{captions.length > 200 && (
							<Link className='block pt-2' href={'/'}>
								See thread
							</Link>
						)}
					</p>
					<div className='min-h-min'>
						{comments.length >= 1 && (
							<p className='flex items-center justify-start gap-1 text-xs text-gray-500'>
								<span>{comments.length}</span> <span> replies</span>
							</p>
						)}
						<ActionButton id={id} likes={likes} />
					</div>
				</div>
			</div>
		</div>
	);
}
