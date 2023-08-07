import type { ReactNode } from 'react';

import { Sidebar, Header } from '@/components';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<main className='w-full h-screen overflow-hidden bg-[#000] text-white max-w-[1470px]'>
			<Header />
			<section className='flex'>
				<Sidebar />
				{children}
			</section>
		</main>
	);
}
