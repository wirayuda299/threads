import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';
import { Toaster } from 'react-hot-toast';
import NextAuthProvider from '@/Provider/NextAuth';

export const metadata: Metadata = {
	title: 'Threads',
	description: 'Threads clone',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NextAuthProvider>{children}</NextAuthProvider>
				<Toaster />
			</body>
		</html>
	);
}
