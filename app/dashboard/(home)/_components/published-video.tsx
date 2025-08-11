import { Button } from '@/components/ui/button'
import { ChartNoAxesColumnIncreasing, Heart, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const PublishedVideo = () => {
	return (
		<div className='p-4 border rounded-xl'>
			<h3 className='text-lg font-space_grotesk font-semibold'>
				Published videos
			</h3>

			<div className='space-y-3 mt-4'>
				{/* Map */}
				<div className='flex gap-x-2'>
					<div className='w-24 h-12 relative'>
						<Image
							fill
							src={
								'https://img.olympics.com/images/image/private/t_social_share_thumb/f_auto/primary/qjxgsf7pqdmyqzsptxju'
							}
							alt='alt'
							className='object-cover rounded-lg'
						/>
					</div>

					<div className='flex flex-col space-y-0 flex-1 h-full'>
						<p className='line-clamp-1 font-space_grotesk font-semibold'>
							The football Olympics 2025 in Paris is going to be the best one
							yet
						</p>

						<div className='flex gap-x-2 pt-1'>
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
				</div>
			</div>

			<Button
				asChild
				size={'lg'}
				className='rounded-full mt-4'
				variant={'outline'}
			>
				<Link href={'/dashboard/videos'}>Go to videos</Link>
			</Button>
		</div>
	)
}

export default PublishedVideo
