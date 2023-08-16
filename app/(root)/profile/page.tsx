import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { Card, Tabs } from '@/components';
import { getThreadsByCurrentUser, getUser } from '@/utils';

export default async function Profile() {
	const session = await getServerSession();

	if (!session) return redirect('/login');

	const currentUser = await getUser(session.user.email as string);

	const threadsByCurrentUser = await getThreadsByCurrentUser(
		currentUser?.username as string
	);

	return (
		<div className='w-full h-screen overflow-y-auto p-10'>
			<section>
				<div className='mx-auto w-full  flex justify-between max-w-7xl items-center'>
					<div className='flex items-center gap-3'>
						<Image
							className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full'
							src={currentUser?.profileImage as string}
							width={100}
							height={100}
							alt={currentUser?.email as string}
							priority
						/>
						<h1 className='text-2xl font-semibold'>{currentUser?.username}</h1>
					</div>
					<button className='bg-[#101012] rounded-md px-3 py-2  inline-flex gap-2 items-center'>
						<Image
							src={'/assets/edit.svg'}
							width={20}
							height={20}
							alt='edit icon'
						/>
						<span className='hidden sm:block'>Edit</span>
					</button>
				</div>
				<hr className='!bg-[#101012] h-0.5 w-full mt-10' />
			</section>
			<section>
				<Tabs />
			</section>
			<section className='mt-5 flex flex-col gap-4'>
				{threadsByCurrentUser?.map((thread) => (
					<Card
						authorLogo={thread.authorImage}
						authorName={thread.authorName}
						captions={thread.captions}
						key={thread.id}
					/>
				))}
			</section>
		</div>
	);
}
