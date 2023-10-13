'use client';

import { User } from '@clerk/nextjs/server';
import Image from 'next/image';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

type FormCommentProps = {
	makeComments: (data: FormData) => Promise<void>;
	user: User | null;
};

export default function FormComment({ makeComments, user }: FormCommentProps) {
	const [pending, startTransition] = useTransition();
	const router = useRouter();

	const postComments = (data: FormData) => {
		startTransition(async () => {
			await makeComments(data).then(() => {
				router.refresh();
			});
		});
	};
	return (
		<form className='flex items-center' action={postComments}>
			<Image
				className='h-12 w-12 rounded-full'
				src={user?.imageUrl!}
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
			<Button
				disabled={pending}
				type='submit'
				className='rounded-full bg-primary-500 px-8'
			>
				{pending ? 'Posting...' : 'Reply'}
			</Button>
		</form>
	);
}
