'use client';
import Image from 'next/image';
import { useState } from 'react';

import { tabsValue } from '@/constant';

export default function Tabs() {
	const [activeTab, setActiveTab] = useState<string>('Threads');
	return (
		<div className='w-full h-14 grid grid-cols-3 rounded-lg mt-4 gap-3 bg-[#121417]'>
			{tabsValue.map((tab) => (
				<button
					onClick={() => setActiveTab(tab.label)}
					className={`${
						activeTab === tab.label ? 'bg-[#0e0e12]' : ''
					} px-5 flex items-center justify-center gap-2 transition-colors duration-500`}
					key={tab.label}
				>
					<Image
						src={tab.icon}
						className='w-5 h-5'
						width={30}
						height={30}
						alt={tab.label}
					/>
					<span className='hidden md:block'>{tab.label}</span>
				</button>
			))}
		</div>
	);
}
