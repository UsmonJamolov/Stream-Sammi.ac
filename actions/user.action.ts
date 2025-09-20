'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { idSchema, usernameSchema } from '@/lib/validation'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const getRecommended = actionClient.action(async () => {
	const { user } = await getUser()

	if (user) {
		const users = await db.user.findMany({
			where: {
				AND: [
					{ NOT: { id: user.id } },
					{ NOT: { followedBy: { some: { followerId: user.id } } } },
				],
			},
			include: { _count: { select: { followedBy: true } } },
			orderBy: { createdAt: 'desc' },
			take: 5,
		})

		return { recommended: users }
	} else {
		const users = await db.user.findMany({
			orderBy: { createdAt: 'desc' },
			take: 5,
			include: { _count: { select: { followedBy: true } } },
		})

		return { recommended: users }
	}
})

export const getFollowing = actionClient.action(async () => {
	const { user } = await getUser()
	if (!user) return { following: [] }

	const following = await db.follow.findMany({
		where: { followerId: user.id },
		select: {
			following: {
				include: { _count: { select: { followedBy: true } } },
			},
			id: true,
		},
		take: 5,
	})

	return { following }
})

export const getUserByUsername = actionClient
	.schema(usernameSchema)
	.action(async ({ parsedInput }) => {
		const { username } = parsedInput
		if (!username) return { user: null }

		const user = await db.user.findUnique({
			where: { username },
			include: { _count: { select: { followedBy: true, videos: true } } },
		})
		if (!user) return { user: null }

		return { user }
	})

export const getUserContent = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id } = parsedInput

		const videos = await db.video.findMany({
			where: { userId: id },
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				title: true,
				thumbnail: true,
				views: true,
				createdAt: true,
			},
		})

		return { videos }
	})

export const getAuthorizedUser = async () => {
	const user = await currentUser()
	if (!user) return redirect('/sign-in')

	const foundedUser = await db.user.findUnique({
		where: { clerkId: user.id },
	})
	if (!foundedUser) return redirect('/sign-in')

	return { user: foundedUser }
}

export const getUser = async () => {
	const user = await currentUser()
	if (!user) return { user: null }

	const foundedUser = await db.user.findUnique({
		where: { clerkId: user.id },
		select: { id: true, clerkId: true, username: true },
	})
	if (!foundedUser) return { user: null }

	return { user: foundedUser }
}

export const isFollowingUser = async (otherUserId: string) => {
	const { user } = await getUser()

	if (!otherUserId) return { isFollowing: false }
	if (!user) return { isFollowing: false }

	const existingFollow = await db.follow.findUnique({
		where: {
			followerId_followingId: { followerId: user.id, followingId: otherUserId },
		},
	})

	return { isFollowing: existingFollow ? true : false }
}

export const followUser = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id: otherUserId } = parsedInput

		const self = await getAuthorizedUser()
		if (!self) return { failure: true }

		if (self.user.id === otherUserId)
			return { failure: 'You cannot follow yourself' }

		const { isFollowing } = await isFollowingUser(otherUserId)
		if (isFollowing) return { failure: 'You are already following this user' }

		await db.follow.create({
			data: {
				followerId: self.user.id,
				followingId: otherUserId,
			},
		})

		revalidatePath('/v')
		revalidatePath('/u')

		return { message: 'Followed successfully' }
	})

export const unfollowUser = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id: otherUserId } = parsedInput

		const self = await getAuthorizedUser()
		if (!self) return { failure: true }

		if (self.user.id === otherUserId)
			return { failure: 'You cannot unfollow yourself' }

		const { isFollowing } = await isFollowingUser(otherUserId)
		if (!isFollowing) return { failure: 'You are not following this user' }

		await db.follow.delete({
			where: {
				followerId_followingId: {
					followerId: self.user.id,
					followingId: otherUserId,
				},
			},
		})

		revalidatePath('/v')
		revalidatePath('/u')

		return { message: 'Unfollowed successfully' }
	})