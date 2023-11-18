'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { postComments } from '@/lib/actions/thread.action';
import { useUser } from '@clerk/nextjs';

type FormCommentProps = {
	id: string;
};

export default function FormComment({ id }: FormCommentProps) {
	const [pending, startTransition] = useTransition();
	const { user } = useUser();
	const router = useRouter();

	const uploadComments = (data: FormData) => {
		startTransition(async () => {
			const comment = data.get('comment');
			await postComments(comment as string, id).then(() => {
				router.refresh();
			});
		});
	};

	return (
		<form className='flex items-center' action={uploadComments}>
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
