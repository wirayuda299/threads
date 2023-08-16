import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import NextAuthProvider from '@/Provider/NextAuth';
import { getServerSession } from 'next-auth';
import { options } from '@/utils';

export const metadata: Metadata = {
	title: 'Threads',
	description: 'Threads clone',
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await getServerSession(options);

	return (
		<html lang='en'>
			<body className={inter.className}>
				<NextAuthProvider session={session}>{children}</NextAuthProvider>
				<Toaster />
			</body>
		</html>
	);
}
