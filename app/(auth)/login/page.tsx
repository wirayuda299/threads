import { signIn } from 'next-auth/react';

import { Form } from '@/components';

export default function Login() {
	const loginUser = async () => {
		await signIn('credentials', {
			redirect: false,
			email: '',
			password: '',
		});
	};
	return <Form type='login' />;
}
