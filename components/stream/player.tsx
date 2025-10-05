import {
	useConnectionState,
	useRemoteParticipant,
	useTracks,
} from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'
import LiveVideo from './live-video'
import LoadingVideo from './loading-video'
import OfflineVideo from './offline-video'

interface PlayerProps {
	hostName: string
	hostId: string
}

const Player = ({ hostId, hostName }: PlayerProps) => {
	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(hostId)
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone,
	]).filter(track => track.participant.identity === hostId)

	let content

	if (!participant && connectionState === ConnectionState.Connected) {
		content = <OfflineVideo hostName={hostName} />
	} else if (!participant || tracks.length === 0) {
		content = <LoadingVideo connectionState={connectionState} />
	} else {
		content = <LiveVideo participant={participant} />
	}

	return (
		<div className='aspect-video group relative rounded-lg shadow-md dark:shadow-white/20'>
			{content}
		</div>
	)
}

export default Player