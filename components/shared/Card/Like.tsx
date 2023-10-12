'use client';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { like } from '@/actions/thread.action';

type LikeButtonProps = {
	id: string;
	likes: string[];
};
export default function LikeButton({ id, likes }: LikeButtonProps) {
	const { userId } = useAuth();

	const router = useRouter();
	const isLikeByCurrentUser = likes.includes(userId as string);

	return (
		<button
			onClick={() =>
				like(id).then(() => {
					router.refresh();
				})
			}
			key={'like'}
			name={'like'}
			title={'like'}
		>
			<Image
				className='aspect-auto object-contain'
				src={
					isLikeByCurrentUser
						? '/assets/red-heart.svg'
						: '/assets/heart-gray.svg'
				}
				width={25}
				height={25}
				alt='icon'
			/>
		</button>
	);
}
