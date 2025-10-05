'use server'

import {
	CreateIngressOptions,
	IngressClient,
	IngressInput,
	RoomServiceClient,
} from 'livekit-server-sdk'
import { getAuthorizedUser } from './user.action'
import { db } from '@/lib/db'
import { actionClient } from '@/lib/safe-action'
import { idSchema } from '@/lib/validation'
import { revalidatePath } from 'next/cache'

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET
)

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)

export const resetIngress = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput }) => {
		const { id } = parsedInput
		const ingresses = await ingressClient.listIngress({ roomName: id })

		const rooms = await roomService.listRooms([id])

		for (const room of rooms) {
			await roomService.deleteRoom(room.name)
		}

		for (const ingress of ingresses) {
			await ingressClient.deleteIngress(ingress.ingressId)
		}

		return { success: 'Ingress reset successfully' }
	})

export const createIngress = actionClient.action(async () => {
	const { user } = await getAuthorizedUser()

	await resetIngress({id: user.id})

	const ingressType = IngressInput.WHIP_INPUT

	const options: CreateIngressOptions = {
		name: user.fullName,
		roomName: user.id,
		participantName: user.username,
		participantIdentity: user.id,
		enableTranscoding: true,
	}

	const ingress = await ingressClient.createIngress(ingressType, options)

	if (!ingress || !ingress.url || !ingress.streamKey) {
		return { failure: 'Failed to create ingress' }
	}

	await db.stream.update({
		where: { userId: user.id },
		data: {
			ingressId: ingress.ingressId,
			serverUrl: ingress.url,
			streamKey: ingress.streamKey,
		},
	})

	revalidatePath('/dashboard/settings')
	
	return { success: 'Ingress created successfully' }
})