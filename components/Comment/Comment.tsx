import Image from 'next/image';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { User, currentUser } from '@clerk/nextjs/server';
import { postComments } from '@/actions/thread.action';

export default async function Comment({ id }: { id: string }) {
	const user: User | null = await currentUser();

	if (!user) return null;

	const makeComments = async (data: FormData) => {
		'use server';
		await postComments(data, user, id);
	};

	return (
		<form className='flex items-center' action={makeComments}>
			<Image
				className='h-12 w-12 rounded-full'
				src={user?.imageUrl}
				alt={user?.username!}
				width={300}
				height={300}
			/>
			<Input
				name='comment'
				className='!border-none bg-transparent focus-visible:!ring-0 focus-visible:ring-offset-0'
				autoFocus
				placeholder='comment'
			/>
			<Button type='submit' className='rounded-full bg-primary-500 px-8'>
				Reply
			</Button>
		</form>
	);
}
