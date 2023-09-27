'use client';

import { UploadDropzone } from '@uploadthing/react';
import { type Dispatch, type SetStateAction } from 'react';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { ImageResult } from '@/types/image';

type FileUploadProps = {
	setImage: Dispatch<SetStateAction<ImageResult | null>>;
};

export default function FileUpload({ setImage }: FileUploadProps) {
	return (
		<div className='h-full w-full max-w-[400px] rounded-lg bg-main'>
			<UploadDropzone<OurFileRouter>
				className='shadow-white-100 ut-button:bg-primary-light dark:shadow-black-100 ut-button:dark:bg-primary-dark min-h-[400px] w-full rounded-2xl border-0 text-black shadow-xl ut-button:mt-5 ut-button:rounded-md ut-button:px-5 ut-button:text-xs ut-button:text-white ut-upload-icon:text-sm ut-allowed-content:dark:text-white ut-label:dark:text-white ut-upload-icon:dark:text-white'
				endpoint='imageUploader'
				onClientUploadComplete={(res) => {
					setImage(res ? res[0] : null);
				}}
				onUploadError={(error: Error) => {
					console.log(error.message);
				}}
			/>
		</div>
	);
}
