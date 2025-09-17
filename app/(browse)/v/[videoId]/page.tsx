import Description from '../_components/description'
import UserInformation from '../_components/user-information'
import VideoActions from '../_components/video-actions'
import  {Comments, CommentsSkeleton } from '../_components/comments'
import RecommendedVideos, {
	RecommendedVideosSkeleton,
} from '../_components/recommended-videos'
import { Suspense } from 'react'
import { getVideoByID, getVideoReaction } from '@/actions/video.action'
import { notFound } from 'next/navigation'
import VideoPlayer from '../_components/video-player'

interface VideoPageProps {
	params: Promise<{ videoId: string }>
}

const VideoPage = async ({ params }: VideoPageProps) => {
	const { videoId } = await params
	const response = await getVideoByID({ id: videoId })

	if (response?.data?.failure) return notFound()

	const video = response?.data?.video

	if (!video) return null

	const { reaction } = await getVideoReaction(video.id)

	return (
		<>
			<div className='grid grid-cols-4 gap-x-4 mt-4'>
				<div className='col-span-3'>
					<VideoPlayer videoUrl={video.videoUrl} />
					<h1 className='text-2xl font-bold mt-4 font-space_grotesk'>
						{video.title}
					</h1>

					<div className='flex items-center justify-between mt-3'>
						<UserInformation video={JSON.parse(JSON.stringify(video))} />

						<VideoActions
							reaction={reaction}
							videoId={video.id}
							videoUrl={video.videoUrl}
						/>
					</div>

					<Description
						views={video.views}
						createdAt={video.createdAt}
						description={video.description}
					/>
					<Suspense fallback={<CommentsSkeleton />}>
						<Comments />
					</Suspense>
				</div>
				<div className='col-span-1'>
					<Suspense fallback={<RecommendedVideosSkeleton />}>
						<RecommendedVideos videoId={video.id} />
					</Suspense>
				</div>
			</div>
		</>
	)
}

export default VideoPage