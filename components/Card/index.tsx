import Image from 'next/image';

import { actionsButtons } from '@/constant';

type CardProps = {
	captions: string;
	authorName: string;
	authorLogo: string;
};

export default function Card({ captions, authorLogo, authorName }: CardProps) {
	const comments = [
		'/assets/placeholder.png',
		'/assets/placeholder.png',
		'/assets/placeholder.png',
	];
	return (
		<div className=' bg-[#121417] min-h-[15rem] rounded-lg max-w-[600px] p-5 overflow-hidden'>
			<div className='flex gap-4 justify-start'>
				<div className='flex flex-col w-min items-center'>
					<Image
						className='w-10 h-10 mb-2'
						src={authorLogo}
						width={40}
						height={40}
						alt='logo'
					/>
					<div className='w-0.5 h-28 bg-gray-600 '></div>
					<div className='flex relative gap-1'>
						{comments.slice(0, 2).map((comm, i) => (
							<Image
								className={`w-8 h-8 ${i > 0 ? '-translate-x-5 z-10' : ''}`}
								src={comm}
								width={40}
								height={40}
								alt='logo'
								key={i}
							/>
						))}
						<p className='inline-flex justify-start items-center text-xs text-gray-500 gap-1'>
							<span>{comments.length}</span> <span> replies</span>
						</p>
					</div>
				</div>
				<div className='max-w-lg flex flex-col'>
					<h2 className='text-xl font-semibold'>{authorName}</h2>
					<p className='text-sm text-gray-200 py-2 flex-1' title={captions}>
						{captions.length >= 200
							? `${captions.slice(0, 200)}......`
							: captions}
					</p>
					<div className='flex gap-3 items-center mt-3 pb-8'>
						{actionsButtons.map((btn, i) => (
							<button key={i} name={btn.label} title={btn.label}>
								<Image src={btn.icon} width={30} height={30} alt='icon' />
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
