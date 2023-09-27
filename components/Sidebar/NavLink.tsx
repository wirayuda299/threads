import { sidebarLinks } from '@/constant';
import SidebarItem from './Item';

export default function NavLink() {
	return (
		<ul className='flex h-full w-full items-center justify-evenly md:flex-col  md:justify-start md:gap-6 '>
			{sidebarLinks.map((item) => (
				<SidebarItem {...item} key={item.label} />
			))}
		</ul>
	);
}
