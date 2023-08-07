import Image from 'next/image';

export default async function Home() {
	const users = await prisma?.user.findMany();

	return (
		<main>
			{users?.map((user) => (
				<div key={user.id}>
					<Image
						src={user.profileImage ?? ''}
						width={50}
						height={50}
						alt={user.email}
					/>
					<span>{user.email}</span>
				</div>
			))}
		</main>
	);
}
