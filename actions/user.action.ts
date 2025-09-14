'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { idSchema, usernameSchema } from '@/lib/validation'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const getRecommended = actionClient.action(async () => {
	await new Promise(resolve => setTimeout(resolve, 1000))
	return { recommended: data }
})

export const getFollowing = actionClient.action(async () => {
	await new Promise(resolve => setTimeout(resolve, 1000))
	return { following: data }
})

export const getUserByUsername = actionClient
	.schema(usernameSchema)
	.action(async ({ parsedInput }) => {
		await new Promise(resolve => setTimeout(resolve, 1000))
		const { username } = parsedInput
		const user = data.find(user => user.username === username)
		return { user }
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

const data = [
	{
		id: '1',
		username: 'samarbadriddin0v',
		avatar: 'https://github.com/shadcn.png',
		followedBy: 8,
		fullName: 'Samar Badriddinov',
	},
	{
		id: '2',
		username: 'oman',
		avatar: 'https://github.com/shadcn.png',
		followedBy: 23,
		fullName: 'Oman',
	},
]