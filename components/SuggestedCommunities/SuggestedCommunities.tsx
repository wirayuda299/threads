import Image from 'next/image';
export default function SuggestedCommunities() {
	const communities = [
		{
			label: 'Twitter',
			logo: '/assets/twitter.png',
		},
		{
			label: 'Instagram',
			logo: '/assets/instagram.png',
		},
		{
			label: 'Youtube',
			logo: '/assets/yt.png',
		},
	];

	return (
		<aside className='min-w-[250px] bg-primary p-5 hidden lg:block'>
			<h2 className='text-2xl font-semibold pb-5'>Suggested Communities</h2>
			<ul className='flex flex-col gap-5'>
				{communities.map((community) => (
					<li
						key={community.label}
						className='flex items-center gap-3 text-lg font-semibold'
					>
						<Image
							src={community.logo}
							width={50}
							height={50}
							alt={community.label}
							className='w-10 h-10 object-contain'
						/>
						{community.label}
					</li>
				))}
			</ul>
		</aside>
	);
}
