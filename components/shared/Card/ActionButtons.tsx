import Link from 'next/link';
import LikeButton from './Like';
import Image from 'next/image';

type ActionButtonProps = {
	id: string;
	likes: string[];
};

export default function ActionButton({ id, likes }: ActionButtonProps) {
	return (
		<div className='mt-3 flex items-center gap-3 '>
			<LikeButton id={id} likes={likes} />
			<Link href={`/thread/${id}`}>
				<Image
					className='h-[30px] w-[30px]'
					src={'/assets/reply.svg'}
					alt='reply icon'
					width={50}
					height={50}
				/>
			</Link>
			<button>
				<Image
					className='h-[30px] w-[30px]'
					src={'/assets/repost.svg'}
					alt='repost icon'
					width={50}
					height={50}
				/>
			</button>
			<button>
				<Image
					className='h-[30px] w-[30px]'
					src={'/assets/share.svg'}
					alt='share icon'
					width={50}
					height={50}
				/>
			</button>
		</div>
	);
}
