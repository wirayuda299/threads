import { getAuth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: '4MB' } })
		.middleware(async ({ req }) => {
			const { userId } = getAuth(req);

			if (!userId) throw new Error('Unauthorized');

			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);
			console.log('file url', file.url);
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
