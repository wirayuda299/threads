import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<section className='w-full h-screen bg-[url("/assets/bg.png")] bg-fixed bg-center bg-no-repeat'>
			<div className='max-w-xl h-full flex mx-auto justify-center aspect-square items-center backdrop-blur-md bg-white bg-opacity-5'>
				{children}
			</div>
		</section>
	);
}
