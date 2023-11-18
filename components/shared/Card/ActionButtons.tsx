'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useAuth } from '@clerk/nextjs';
import { like } from '@/lib/actions/thread.action';
import Link from 'next/link';

type ActionButtonProps = {
	id: string;
	likes: string[];
	type: string;
};

export default function ActionButton({ id, likes, type }: ActionButtonProps) {
	const { userId } = useAuth();

	const router = useRouter();
	const isLikedByCurrentUser = likes.includes(userId!);

	return (
		<div className='mt-3 inline-flex items-center gap-x-3'>
			<button onClick={() => like(id).then(() => router.refresh())}>
				<Image
					className='aspect-auto h-[30px] w-[30px] object-contain'
					src={
						isLikedByCurrentUser
							? '/assets/red-heart.svg'
							: '/assets/heart-gray.svg'
					}
					alt={'heart icon'}
					width={30}
					height={30}
				/>
			</button>
			<Link href={type === 'thread' ? `/thread/${id}` : '/comment'}>
				<Image
					className='aspect-auto h-[30px] w-[30px] object-contain'
					src={'/assets/reply.svg'}
					alt={'chat icon'}
					width={30}
					height={30}
				/>
			</Link>
			<button>
				<Image
					className='aspect-auto h-[30px] w-[30px] object-contain'
					src={'/assets/repost.svg'}
					alt={'repost icon'}
					width={30}
					height={30}
				/>
			</button>
			<button>
				<Image
					className='aspect-auto h-[30px] w-[30px] object-contain'
					src={'/assets/share.svg'}
					alt={'repost icon'}
					width={30}
					height={30}
				/>
			</button>
		</div>
	);
}
