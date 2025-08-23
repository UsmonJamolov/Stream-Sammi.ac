import { getAuthorizedUser } from '@/actions/user.action'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { db } from '@/lib/db'

const f = createUploadthing()

console.log(f)

export const ourFileRouter = {
	imageUploader: f({
		image: {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	})
		.middleware(async () => {
			const response = await getAuthorizedUser()
			console.log(response)

			const user = await response?.data?.user

			if (!user) throw new UploadThingError('Unauthorized')
			return { userId: user.id }
		})
		.onUploadComplete(async ({ file, metadata }) => {
			return { url: file.ufsUrl, userId: metadata.userId }
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
					thumbnail: 'https://fakeimg.pl/600x400?text=thumbnail',
					videoUrl: file.ufsUrl,
				},
			})

			return { url: file.name, videoId: newVideo.id }

			// return { url: file.ufsUrl, userId: metadata.userId }
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
