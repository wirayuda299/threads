export type Thread = {
	id: string;
	authorName: string;
	authorImage: string;
	image: string | null;
	captions: string;
	userId: string | null;
	createdAt: string;
	likes: string[];
};
