import Description from '../_components/description'
import UserInformation from '../_components/user-information'
import VideoActions from '../_components/video-actions'
import { Comments, CommentsSkeleton } from '../_components/comments'
import {
	RecommendedVideos,
	RecommendedVideosSkeleton,
} from '../_components/recommended-videos'
import { Suspense } from 'react'

// interface VideoPageProps {
// 	params: Promise<{ videoId: string }>
// }

const VideoPage = () => {
	// const { videoId } = await params

	return (
		<>
			<div className='grid grid-cols-4 gap-x-4 mt-4'>
				<div className='col-span-3'>
					<div className='aspect-video bg-secondary rounded-md' />
					<h1 className='text-2xl font-bold mt-4 font-space_grotesk'>
						How to build a website with Next.js and Tailwind CSS - Full Course
					</h1>

					<div className='flex items-center justify-between mt-3'>
						<UserInformation />

						<VideoActions reaction={'LIKE'} />
					</div>

					<Description />
					<Suspense fallback={<CommentsSkeleton />}>
						<Comments />
					</Suspense>
				</div>
				<div className='col-span-1'>
					<Suspense fallback={<RecommendedVideosSkeleton />}>
						<RecommendedVideos />
					</Suspense>
				</div>
			</div>
		</>
	)
}

export default VideoPage
