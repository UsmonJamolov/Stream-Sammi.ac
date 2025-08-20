'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { usernameSchema } from '@/lib/validation'
import { currentUser } from '@clerk/nextjs/server'
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

export const getAuthorizedUser = actionClient.action(async () => {
	const user = await currentUser()
	if (!user) return redirect('/sign-in')

	const foundedUser = db.user.findUnique({
		where: { clerkId: user.id },
	})
	if (!user) return redirect('/sign-in')

	return { user: foundedUser }
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
