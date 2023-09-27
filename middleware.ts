import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	apiRoutes: '/api/thread',
	ignoredRoutes: ['/((?!api|trpc))(_next.*|.+.[w]+$)', '/api/thread'],
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
};
