import { Video } from '@prisma/client'

interface VideoDetailProps {
	video: Video
}

const VideoDetail = ({ video }: VideoDetailProps) => {
	return <div>VideoDetail</div>
}

export default VideoDetail
