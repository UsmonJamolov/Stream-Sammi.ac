'use server'

import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { updateVideoSchema } from '@/lib/validation'

export const getComments = actionClient.action(async () => {
	await new Promise(resolve => setTimeout(resolve, 1000))
	return { comments: data }
})

export const updateVideo = actionClient
	.schema(updateVideoSchema)
	.action(async ({ parsedInput }) => {
		const { videoId, category, description, title, thumbnail } = parsedInput
		if (!videoId) return { failure: 'Video ID is required' }

		const updatedVideo = await db.video.update({
			where: { id: videoId },
			data: { category, description, title, thumbnail },
		})
		if (!updatedVideo) return { failure: 'Video not found' }

		return { success: updatedVideo.id }
	})

const data = [
	{
		id: 1,
		createdAt: new Date('2025-02-01T12:00:00Z'),
		content: 'Hello world',
		user: {
			id: 1,
			username: 'usman',
			avatar: 'https://github.com/shadcn.png',
			followeBy: 8,
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
