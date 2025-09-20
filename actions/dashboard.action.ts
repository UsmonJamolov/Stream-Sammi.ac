'use server'

import { actionClient } from '@/lib/safe-action'
import { getAuthorizedUser } from './user.action'
import { db } from '@/lib/db'
import { idSchema, updateVideoSchema } from '@/lib/validation'
import { revalidatePath } from 'next/cache'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi({})

export const getVideos = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	const videos = await db.video.findMany({
		where: { userId: user.id },
	})

	return { videos: videos }
})

export const getVideoById = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { user } = await getAuthorizedUser()
		if (!user) return { failure: 'Unauthorized' }

		const { id } = parsedInput
		if (!id) return { failure: 'Invalid id' }

		const video = await db.video.findUnique({
			where: { id },
		})
		if (!video) return { failure: 'Video not found' }

		if (video.userId !== user.id) return { failure: 'Unauthorized' }

		return { video }
	})

export const updateVideo = actionClient
	.schema(updateVideoSchema)
	.action(async ({ parsedInput }) => {
		const { videoId, ...paylaod } = parsedInput
		if (!videoId) return { failure: 'Video ID is required' }

		const updatedVideo = await db.video.update({
			where: { id: videoId },
			data: paylaod,
		})
		if (!updatedVideo) return { failure: 'Video not found' }

		revalidatePath('/dashboard/videos')
		return { success: updatedVideo.id }
	})

export const deleteVideoById = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { user } = await getAuthorizedUser()
		if (!user) return { failure: 'Unauthorized' }

		const { id } = parsedInput
		if (!id) return { failure: 'Invalid id' }

		const video = await db.video.findUnique({ where: { id } })
		if (!video) return { failure: 'Video not found' }

		if (video.userId !== user.id) return { failure: 'Unauthorized' }

		await db.video.delete({ where: { id } })
		await utapi.deleteFiles([video.thumbnailKey, video.videoUrlKey])

		revalidatePath('/dashboard/videos')

		return { success: 'Video deleted successfully' }
	})