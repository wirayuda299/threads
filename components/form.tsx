'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, FieldValues } from 'react-hook-form';

import { signUp } from '@/utils/signUp';
import { signInUser } from '@/utils/signIn';

export default function Form({ type }: { type: 'login' | 'register' }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: FieldValues) => {
		if (type === 'register') {
			return await signUp(data.email, data.password, setLoading);
		}
		return signInUser(data.email, data.password, router);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16'
		>
			<div>
				<label
					htmlFor='email'
					className='block text-xs text-gray-600 uppercase'
				>
					Email Address
				</label>
				<input
					id='email'
					type='email'
					placeholder='panic@thedis.co'
					autoComplete='off'
					{...register('email', {
						required: true,
						minLength: 8,
						maxLength: 200,
					})}
					className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
				/>
				{errors.email?.type === 'required' && (
					<p className='text-red-500 text-xs pt-1'>Email is required</p>
				)}
			</div>
			<div>
				<label
					htmlFor='password'
					className='block text-xs text-gray-600 uppercase'
				>
					Password
				</label>
				<input
					id='password'
					autoComplete='off'
					type='password'
					{...register('password', {
						required: true,
						minLength: 8,
						maxLength: 20,
					})}
					className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
				/>
				{errors.password?.type === 'required' && (
					<p className='text-red-500 text-xs pt-1'>Password is required</p>
				)}
			</div>
			<button
				type='submit'
				disabled={loading}
				className={`${
					loading
						? 'cursor-not-allowed border-gray-200 bg-gray-100'
						: 'border-black bg-black text-white hover:bg-white hover:text-black'
				} flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
			>
				{loading ? (
					<p>Loading...</p>
				) : (
					<p>{type === 'login' ? 'Sign In' : 'Sign Up'}</p>
				)}
			</button>
			{type === 'login' ? (
				<p className='text-center text-sm text-gray-600'>
					Don&apos;t have an account?{' '}
					<Link href='/register' className='font-semibold text-gray-800'>
						Sign up
					</Link>{' '}
					for free.
				</p>
			) : (
				<p className='text-center text-sm text-gray-600'>
					Already have an account?{' '}
					<Link href='/login' className='font-semibold text-gray-800'>
						Sign in
					</Link>{' '}
					instead.
				</p>
			)}
		</form>
	);
}
