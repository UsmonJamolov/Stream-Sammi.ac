'use client'

import { Stream, User } from '@prisma/client'
import { LiveKitRoom } from '@livekit/components-react'
import { useViewerToken } from '@/hooks/use-token'
import Player from './player'
import Chat from './chat'

interface StreamContentProps {
	user: User
	stream: Stream
}

const StreamContent = ({ stream, user }: StreamContentProps) => {
	const { identity, name, token } = useViewerToken(user.id)

	return (
		<>
			<LiveKitRoom
				audio={true}
				video={true}
				token={token}
				serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
				className='grid grid-cols-4 gap-4'
			>
				<div className='col-span-3 space-y-4'>
					<Player hostName={user.username} hostId={user.id} />
				</div>
				<div className='col-span-1'>
					<Chat />
				</div>
			</LiveKitRoom>
		</>
	)
}

export default StreamContent