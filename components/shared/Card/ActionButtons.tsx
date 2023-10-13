import Link from 'next/link';
import Image from 'next/image';

import LikeButton from './Like';

type ActionButtonProps = {
	id: string;
	likes: string[];
};

export default function ActionButton({ id, likes }: ActionButtonProps) {
	return (
		<div className='mt-3 inline-flex items-center gap-x-3'>
			<LikeButton id={id} likes={likes} />
			<Link href={`/thread/${id}`}>
				<Image
					className='aspect-auto h-[30px] w-[30px] object-contain'
					src={'/assets/reply.svg'}
					alt='reply icon'
					width={50}
					height={50}
				/>
			</Link>
			<button>
				<Image
					className='aspect-auto h-[30px] w-[30px] object-contain'
					src={'/assets/repost.svg'}
					alt='repost icon'
					width={50}
					height={50}
				/>
			</button>
			<button>
				<Image
					className='aspect-auto h-[30px] w-[30px] object-contain'
					src={'/assets/share.svg'}
					alt='share icon'
					width={50}
					height={50}
				/>
			</button>
		</div>
	);
}
