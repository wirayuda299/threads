export type Thread = {
	id: string;
	authorName: string;
	authorImage: string;
	image: string | null;
	captions: string;
	userId: string | null;
	createdAt: string;
	likes: string[];
	comments: {
		id: string;
		authorName: string;
		authorImage: string;
		createdAt: string;
		comments: string;
		threadId: string | null;
		likes: string[];
	}[];
};
