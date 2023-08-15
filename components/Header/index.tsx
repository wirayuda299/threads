import Image from 'next/image';
import Link from 'next/link';
export default function Header() {
	return (
		<header className='w-full h-20 bg-primary flex items-center p-5 text-white'>
			<Link className='flex items-center gap-3' href='/'>
				<Image
					src='/assets/logo.png'
					className='object-contain w-8 h-8'
					width={35}
					height={35}
					alt='Threads'
				/>
				<h1 className='text-2xl font-semibold'>Threads</h1>
			</Link>
		</header>
	);
}
