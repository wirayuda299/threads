import { currentUser } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		// @ts-ignore
		const user = await getAuth(req);
		console.log(await user);

		if (!user) {
			return NextResponse.json({ message: 'UnAuthorized', error: true });
		}
		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json({ error: error.message });
	}
}
