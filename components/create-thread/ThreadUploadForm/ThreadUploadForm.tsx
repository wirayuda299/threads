'use client';

import { Button } from '@/components/ui/button';

import { Textarea } from '../../ui/textarea';
import { createThread } from '@/serverAction/thread.action';
import { toast } from '../../ui/use-toast';
import { useRouter } from 'next/navigation';

export default function ThreadUpload() {
	const router = useRouter();
	const uploadThread = async (data: FormData) => {
		try {
			await createThread(data);

			toast({
				title: 'Thread uploaded',
			});
			router.push('/');
			router.refresh();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className=' h-screen overflow-y-auto p-7'>
			<h1 className='py-5 text-2xl font-semibold'>Create Thread</h1>
			<form action={uploadThread} className='h-full w-full space-y-8'>
				<Textarea
					name='captions'
					rows={18}
					className='max-w-full resize-none border-none bg-main'
					placeholder='Your captions'
				/>
				<Button type='submit' className='w-full bg-primary-500'>
					Post Thread
				</Button>
			</form>
		</section>
	);
}
