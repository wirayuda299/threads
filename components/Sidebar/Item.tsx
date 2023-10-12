'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type SidebarItemProps = {
	route: string;
	label: string;
	imgURL: string;
};

export default function SidebarItem({
	route,
	imgURL,
	label,
}: SidebarItemProps) {
	const pathname = usePathname();

	return (
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
	);
}
