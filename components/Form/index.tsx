'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, FieldValues } from 'react-hook-form';

import img from '../../public/assets/placeholder.png';
import { signUp } from '@/utils/signUp';
import { signInUser } from '@/utils/signIn';
import FormInput from './Input';

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
			username: '',
		},
	});

	const onSubmit = async (data: FieldValues) => {
		if (type === 'register') {
			return await signUp(
				data.email,
				data.password,
				setLoading,
				img.src,
				router,
				data.username
			);
		}
		return signInUser(data.email, data.password, router);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col items-center w-full max-w-lg p-10 bg-gray-100 shadow-2xl bg-opacity-5 backdrop-blur-md  rounded-lg'
		>
			<div className='flex gap-2 '>
				<Image
					src='/assets/logo.png'
					width={40}
					height={40}
					alt='threads logo'
					priority
					className='mb-5'
				/>
				<h1 className='text-4xl text-transparent font-semibold bg-gradient-to-r from-[#733eb9] to-[#e34362] bg-clip-text'>
					Threads
				</h1>
			</div>
			{type !== 'login' && (
				<FormInput
					placeholder='Username'
					textLabel='Username'
					field='username'
					errorMessage={
						errors.email?.type === 'required' ? 'Username is required' : ''
					}
					isError={errors.email?.type === 'required'}
					register={register}
				/>
			)}
			<FormInput
				placeholder='Email'
				textLabel='Email address'
				field='email'
				errorMessage={
					errors.email?.type === 'required' ? 'Email is required' : ''
				}
				isError={errors.email?.type === 'required'}
				register={register}
			/>
			<FormInput
				placeholder='Password'
				textLabel='your password'
				field='password'
				errorMessage={
					errors.password?.type === 'required' ? 'Password is required' : ''
				}
				isError={errors.password?.type === 'required'}
				register={register}
			/>
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
			<div className='mt-3'>
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
			</div>
		</form>
	);
}
