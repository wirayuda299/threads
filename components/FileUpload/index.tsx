'use client';

import '@uploadthing/react/styles.css';

import { UploadButton } from '@/utils/uploadthing';

export default function FileUpload() {
	return (
		<UploadButton
			endpoint='imageUploader'
			onClientUploadComplete={(res) => {
				// Do something with the response
				console.log('Files: ', res);
				alert('Upload Completed');
			}}
			onUploadError={(error: Error) => {
				// Do something with the error.
				alert(`ERROR! ${error.message}`);
			}}
		/>
	);
}
