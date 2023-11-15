'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { sidebarLinks } from '@/constants';

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className='fixed inset-x-0 bottom-0 z-20 h-20 bg-main md:sticky md:!top-0 md:mt-20 md:h-screen md:w-full md:max-w-[250px] md:z-0'>
			<nav className='h-full w-full p-5'>
				<ul className='flex h-full w-full items-center justify-evenly md:flex-col  md:justify-start md:gap-6 '>
					{sidebarLinks.map(({ imgURL, label, route }) => (
						<Link
							href={route}
							className={`ease inline-flex items-center gap-3 rounded-full p-2 !text-white transition-all  duration-300 hover:bg-primary-500 md:w-full md:rounded-lg lg:p-3 ${
								pathname === route ? 'bg-primary-500' : ''
							}`}
							key={label}
						>
							<Image
								className='h-5 w-5 object-contain'
								src={imgURL}
								width={30}
								height={30}
								alt={label}
							/>
							<span className=' hidden text-white md:!block'>{label}</span>
						</Link>
					))}
				</ul>
			</nav>
		</aside>
	);
}
