'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { idSchema } from '@/lib/validation'

export const getPublicVideos = actionClient.action(async () => {
	const videos = await db.video.findMany({
		orderBy: { createdAt: 'desc' },
		select: {
			id: true,
			title: true,
			thumbnail: true,
			createdAt: true,
			user: { select: { id: true, username: true, avatar: true } },
		},
	})

	return { videos }
})

export const getVideoByID = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id } = parsedInput
		if (!id) return { failure: 'Invalid ID' }

		const video = await db.video.findUnique({
			where: { id },
			omit: {
				updatedAt: true,
				thumbnailKey: true,
				videoUrlKey: true,
				userId: true,
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						fullName: true,
						avatar: true,
						_count: { select: { followedBy: true, videos: true } },
					},
				},
			},
		})
		if (!video) return { failure: 'Video not found' }

		return { video }
	})

export const getComments = actionClient.action(async () => {
	await new Promise(resolve => setTimeout(resolve, 1000))
	return { comments: data }
})

const data = [
	{
		id: '1',
		createdAt: new Date('2025-02-01T12:00:00Z'),
		content: 'Hello world',
		user: {
			id: '1',
			username: 'samar',
			avatar: 'https://github.com/shadcn.png',
			followedBy: 8,
		},
	},
	{
		id: '2',
		createdAt: new Date('2025-02-01T12:00:00Z'),
		content:
			'Great video about the Olympics 2025 in Paris is going to be the best one yet',
		user: {
			id: '1',
			username: 'oman',
			avatar: 'https://github.com/shadcn.png',
			followedBy: 8,
		},
	},
]