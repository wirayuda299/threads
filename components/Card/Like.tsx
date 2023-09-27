'use client';
import { like } from '@/helper/threads';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
				src={
					isLikeByCurrentUser
						? '/assets/red-heart.svg'
						: '/assets/heart-gray.svg'
				}
				width={30}
				height={30}
				alt='icon'
			/>
		</button>
	);
}
