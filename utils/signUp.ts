import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

export const signUp = async (
	email: string,
	password: string,
	setLoading: Dispatch<SetStateAction<boolean>>,
	profileImage: string,
	router: AppRouterInstance,
	username: string
) => {
	setLoading(true);

	try {
		const registerUser = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				profileImage,
				username,
				bio: '',
			}),
		});
		await registerUser.json();

		setLoading(false);
		toast.success('Account created! Redirecting to login...');
		router.push('/login');
	} catch (error) {
		setLoading(false);
		toast.success('Something went wrong...');
	}
};
