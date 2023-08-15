import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import Menu from './Menu';
import { getUser } from '@/utils/getUser';

export default async function Header() {
	const session = await getServerSession();
	const user = await getUser(session?.user.email as string);

	return (
		<header className='w-full h-20 bg-primary flex justify-between items-center p-5 text-white'>
			<div>
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
			</div>
			<div className='inline-flex items-center gap-2'>
				<Menu />
				<p>{user && user.username}</p>
			</div>
		</header>
	);
}
