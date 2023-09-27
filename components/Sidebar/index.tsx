import NavLink from './NavLink';

export default function Sidebar() {
	return (
		<aside className='fixed inset-x-0 bottom-0 z-20 h-20 bg-main md:static md:h-screen md:w-full md:max-w-[250px] '>
			<nav className='h-full w-full p-5'>
				<NavLink />
			</nav>
		</aside>
	);
}
