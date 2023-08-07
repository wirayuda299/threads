'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function ThreadUpload() {
	const [loading, setLoading] = useState(false);
	const session = useSession();
	const navigate = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			captions: '',
		},
	});

	const onSubmit = async (data: FieldValues) => {
		setLoading(true);
		try {
			const base = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
			const res = await fetch(`${base}/api/threads`, {
				method: 'POST',
				body: JSON.stringify({
					email: session?.data?.user?.email,
					captions: data?.captions,
				}),
			});
			await res.json();
			navigate.push('/');
			toast.success('Thread upload sucessfully');
		} catch (error: any) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className='w-full'>
			<div className='w-full p-5 max-w-3xl'>
				<h1 className='text-3xl font-semibold py-3'>Create Thread</h1>
				<form
					className='w-full h-full flex flex-col items-center'
					onSubmit={handleSubmit(onSubmit)}
				>
					<textarea
						{...register('captions', { required: true })}
						name='captions'
						placeholder='Write something to post'
						className='bg-[#101012] w-full rounded-lg min-h-[200px] self-start  p-3 focus:outline-none'
						cols={30}
						rows={10}
					/>
					{errors.captions?.type === 'required' && <p>Captions is required</p>}
					<button
						disabled={loading}
						type='submit'
						name='post thread'
						title='post thread'
						className={`${
							loading ? 'cursor-not-allowed' : 'cursor-default'
						} bg-[#877eff] w-full p-3 rounded-lg mt-5`}
					>
						{loading ? 'Loading.....' : '	Post Thread'}
					</button>
				</form>
			</div>
		</section>
	);
}
