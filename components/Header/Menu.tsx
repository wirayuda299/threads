'use client';
import { signOut, useSession } from 'next-auth/react';

import { GiExitDoor } from 'react-icons/gi';
export default function Menu() {
	return (
		<button
			title='Sign Out'
			onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
		>
			<GiExitDoor size={20} />
		</button>
	);
}
