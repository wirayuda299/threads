import Image from 'next/image';
import { sidebarLinks } from '@/constant/navItems';
import Link from 'next/link';

export default function Sidebar() {
	return (
		<aside className='w-full bg-[#121417] fixed bottom-0 h-20 md:h-screen md:w-[200px] lg:w-[250px] md:static'>
			<nav className='w-full h-full p-5'>
				<ul className='w-full h-full flex md:flex-col justify-evenly md:justify-start items-start gap-5 transition-all ease duration-500'>
					{sidebarLinks.map((item) => (
						<li
							className='hover:bg-[#877eff] p-3 rounded-lg flex items-center gap-3'
							key={item.label}
						>
							<Image
								src={item.imgURL}
								width={30}
								height={30}
								alt={item.label}
								priority
							/>
							<Link href={item.route} className='hidden md:block'>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
