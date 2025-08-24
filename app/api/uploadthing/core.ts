import { getAuthorizedUser } from '@/actions/user.action'
import { db } from '@/lib/db'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
	imageUploader: f({
		image: { maxFileSize: '4MB', maxFileCount: 1 },
	})
		.middleware(async () => {
			const response = await getAuthorizedUser()
			const user = await response?.data?.user
			if (!user) throw new UploadThingError('Unauthorized')
			return { userId: user.id }
		})
		.onUploadComplete(async ({ file }) => {
			return { url: file.name }
		}),

	videoUploader: f({
		video: { maxFileSize: '128MB', maxFileCount: 1 },
	})
		.middleware(async () => {
			const response = await getAuthorizedUser()
			const user = await response?.data?.user
			if (!user) throw new UploadThingError('Unauthorized')
			return { userId: user.id }
		})
		.onUploadComplete(async ({ file, metadata }) => {
			const newVideo = await db.video.create({
				data: {
					userId: metadata.userId,
					title: file.name,
					description: 'Description goes here',
					thumbnail:
						'https://fakeimg.deblan.org/600x400/000/fff.jpg&text=thumbnail',
					videoUrl: file.ufsUrl,
				},
			})

			return { url: file.name, videoId: newVideo.id }
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
