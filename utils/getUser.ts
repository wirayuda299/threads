export async function getUser(email: string) {
	try {
		const user = await prisma?.user.findFirst({
			where: {
				email,
			},
			select: {
				email: true,
				username: true,
			},
		});
		return user;
	} catch (error) {
		console.log(error);
	}
}
