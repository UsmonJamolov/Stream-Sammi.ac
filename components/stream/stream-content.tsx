'use client'

import { Stream, User } from '@prisma/client'
import { LiveKitRoom } from '@livekit/components-react'
import { useViewerToken } from '@/hooks/use-token'
import Player from './player'
import Chat from './chat'
import GenerateKey from './generate-key'
import UpdateStream from './update-stream'
import Thumbnail from './thumbnail'

interface StreamContentProps {
	user: User
	stream: Stream
	isFollwing: boolean
}

const StreamContent = ({ stream, user, isFollowing }: StreamContentProps) => {
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
				<div className='col-span-1 rounded-lg bg-gradient-to-b from-background to-secondary rounded-b-none'>
					<Chat hostId={user.id} stream={stream} isFollowing={isFollowing} />
				</div>
			</LiveKitRoom>

			<div className="grid grid-cols-4 mt-4">
				<div className="col-span-3 space-y-4">
					<GenerateKey stream={stream} />
					<UpdateStream stream={stream} />
					<Thumbnail stream={stream} user={user} />
				</div>
			</div>
		</>
	)
}

export default StreamContent