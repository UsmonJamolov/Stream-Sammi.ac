import { getVideoById } from '@/actions/dashboard.action'
import { Separator } from '@/components/ui/separator'
import { notFound } from 'next/navigation'
import Actions from '../_components/actions'
import Details from '../_components/details'
import VideoDetail from '../_components/video-detail'

interface PageProps {
	params: Promise<{ videoId: string }>
}

const Page = async ({ params }: PageProps) => {
	const { videoId } = await params

	const response = await getVideoById({ id: videoId })
	if (response?.data?.failure) return notFound()

	const video = response?.data?.video

	if (!video) return notFound()

	return (
		<>
			<Actions video={video} />
			<Separator className='my-3' />

			<div className='grid grid-cols-2 gap-x-8'>
				<Details />
				<VideoDetail />
			</div>
		</>
	)
}

export default Page
