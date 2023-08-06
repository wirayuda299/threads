import Form from '@/components/form';
import { signIn } from 'next-auth/react';

export default function Login() {
	const loginUser = async () => {
		await signIn('credentials', {
			redirect: false,
			email: '',
			password: '',
		});
	};
	return (
		<section className='w-full h-screen max-w-lg mx-auto flex flex-col justify-center'>
			<Form type='login' />
		</section>
	);
}
