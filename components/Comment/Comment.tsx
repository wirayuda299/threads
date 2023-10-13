import { User, currentUser } from '@clerk/nextjs/server';

import { postComments } from '@/actions/thread.action';
import FormComment from './Form';

export default async function Comment({ id }: { id: string }) {
	const user: User | null = await currentUser();

	if (!user) return null;

	const makeComments = async (data: FormData) => {
		'use server';
		await postComments(data, user, id);
	};

	return <FormComment makeComments={makeComments} user={user} />;
}
