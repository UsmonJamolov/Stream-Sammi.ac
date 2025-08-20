import { getAuthorizedUser } from '@/actions/user.action'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

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
			console.log(user)

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
			console.log('user', user)

			if (!user) throw new UploadThingError('Unauthorized')
			return { userId: user.id }
		})
		.onUploadComplete(async ({ file, metadata }) => {
			return { url: file.ufsUrl, userId: metadata.userId }
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
