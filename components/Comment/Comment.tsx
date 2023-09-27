'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function Comment() {
	const { isLoaded, isSignedIn, user } = useUser();

	if (!isLoaded || !isSignedIn) return null;

	return (
		<div className='flex items-center'>
			<Image
				className='h-12 w-12 rounded-full'
				src={user?.imageUrl}
				alt={user?.username!}
				width={300}
				height={300}
			/>
			<Input
				className='!border-none bg-transparent focus-visible:!ring-0 focus-visible:ring-offset-0'
				autoFocus
				placeholder='comment'
			/>
			<Button className='rounded-full bg-primary-500 px-8'>Reply</Button>
		</div>
	);
}
