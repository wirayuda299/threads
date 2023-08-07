import Image from 'next/image';
import prisma from '@/lib/prisma';
import LogOut from './profile/logout';
import { ThreadUpload } from '@/components';

export default async function Home() {
	const users = await prisma?.user.findMany();

	return (
		<main className='w-full'>
			<LogOut />
			<ThreadUpload />
		</main>
	);
}
