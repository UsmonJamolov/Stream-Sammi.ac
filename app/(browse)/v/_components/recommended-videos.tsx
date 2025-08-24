import { getHomeFeed } from '@/actions/feed.action'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartNoAxesColumnIncreasing, Heart, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const RecommendedVideos = async () => {
	const response = await getHomeFeed()

	const feed = response?.data?.feed || []

	return (
		<>
			<h2 className='font-space_grotesk text-2xl'>Recommended</h2>

			{feed.map(video => (
				<Link
					href={'/v/1'}
					className='flex flex-col space-y-2 mt-4'
					key={video.id}
				>
					<div className='flex gap-x-2'>
						<Image
							src={video.thumbnail}
							alt={video.title}
							width={96}
							height={54}
							className='object-cover rounded-md'
						/>

						<div className='flex flex-col space-y-0 flex-1 h-full'>
							<p className='line-clamp-1 font-space_grotesk font-semibold'>
								{video.title}
							</p>

							<div className='flex gap-x-4 pt-1'>
								<div className='flex items-center text-muted-foreground gap-x-1'>
									<ChartNoAxesColumnIncreasing className='size-4' />
									<p className='text-xs'>200</p>
								</div>

								<div className='flex items-center text-muted-foreground gap-x-1'>
									<MessageSquare className='size-4' />
									<p className='text-xs'>14</p>
								</div>

								<div className='flex items-center text-muted-foreground gap-x-1'>
									<Heart className='size-4' />
									<p className='text-xs'>88</p>
								</div>
							</div>
						</div>
					</div>
				</Link>
			))}
		</>
	)
}

export const RecommendedVideosSkeleton = () => {
	return (
		<>
			<h2 className='font-space_grotesk text-2xl'>Recommended</h2>

			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index} className='flex flex-col space-y-2 mt-4'>
					<div className='flex gap-x-2'>
						<Skeleton className='rounded-md w-[96px] h-[54px]' />

						<div className='flex flex-col space-y-0 flex-1 h-full w-full'>
							<Skeleton className='w-full h-4' />

							<div className='flex gap-x-4 pt-2'>
								<Skeleton className='w-1/3 h-4' />
								<Skeleton className='w-1/3 h-4' />
								<Skeleton className='w-1/3 h-4' />
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
