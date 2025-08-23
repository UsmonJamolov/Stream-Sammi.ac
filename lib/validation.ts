import { z } from 'zod'

export const usernameSchema = z.object({
	username: z.string(),
})

export const updateVideoSchema = z.object({
	videoId: z.string(),
	title: z.string().optional(),
	description: z.string().optional(),
	category: z.string().optional(),
	thumbnail: z.string().optional(),
})
