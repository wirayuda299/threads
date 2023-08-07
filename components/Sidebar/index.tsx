'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constant';

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className='w-full bg-[#121417] fixed bottom-0 h-20 md:h-screen md:w-[250px] lg:w-[280px] md:static'>
			<nav className='w-full h-full p-5'>
				<ul className='w-full h-full flex md:flex-col justify-evenly items-center md:justify-start  gap-2 md:gap-6 '>
					{sidebarLinks.map((item) => (
						<Link
							href={item.route}
							className={` ${
								pathname === item.route
									? 'hover:bg-[#877eff]'
									: 'hover:bg-[#877eff54]'
							} ${
								pathname === item.route ? 'bg-[#877eff]' : ''
							} p-3 md:rounded-lg flex items-center gap-3 transition-all ease rounded-full duration-300 md:w-full`}
							key={item.label}
						>
							<Image
								src={item.imgURL}
								width={30}
								height={30}
								alt={item.label}
							/>
							<span className='hidden md:block'>{item.label}</span>
						</Link>
					))}
				</ul>
			</nav>
		</aside>
	);
}
