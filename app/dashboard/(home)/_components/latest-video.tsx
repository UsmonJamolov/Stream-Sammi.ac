import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Clock, Eye, Heart, MessageSquare, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const LatestVideo = () => {
	return (
		<>
			<div className='p-4 border rounded-xl'>
				<h3 className='text-lg font-space_grotesk font-semibold'>
					Latest video performance
				</h3>

				<div className='w-full relative h-44 mt-4'>
					<div className='absolute inset-0 z-40 bg-gradient-to-t from-primary rounded-lg' />
					<Image
						src={
							'https://img.olympics.com/images/image/private/t_16-9_640/f_auto/v1538355600/primary/owtwv8todbwx68perkjz'
						}
						alt='alt'
						fill
						className='object-cover rounded-lg'
					/>
					<div className='absolute bottom-0 z-50 p-2 text-lg font-space_grotesk font-bold text-primary-foreground'>
						The Olympics
					</div>
				</div>

				<p className='mt-4 text-sm text-muted-foreground'>
					2 days compared to your typical performance:
				</p>

				<Separator className='my-2' />

				<div className='space-y-2'>
					<div className='flex items-center justify-between'>
						<div className='font-space_grotesk flex items-center gap-x-1'>
							<Clock className='size-4' />
							<span>Created at</span>
						</div>
						<p className='text-muted-foreground font-medium border-b border-b-secondary text-sm'>
							2 days ago
						</p>
					</div>

					<div className='flex items-center justify-between'>
						<div className='font-space_grotesk flex items-center gap-x-1'>
							<Eye className='size-4' />
							<span>Views</span>
						</div>
						<p className='text-muted-foreground font-medium border-b border-b-secondary text-sm'>
							300
						</p>
					</div>

					<div className='flex items-center justify-between'>
						<div className='font-space_grotesk flex items-center gap-x-1'>
							<MessageSquare className='size-4' />
							<span>Messages</span>
						</div>
						<p className='text-muted-foreground font-medium border-b border-b-secondary text-sm'>
							14
						</p>
					</div>

					<div className='flex items-center justify-between'>
						<div className='font-space_grotesk flex items-center gap-x-1'>
							<Heart className='size-4' />
							<span>Likes</span>
						</div>
						<p className='text-muted-foreground font-medium border-b border-b-secondary text-sm'>
							99
						</p>
					</div>
				</div>

				<div className='space-y-4 flex flex-col mt-4'>
					<Button
						size={'lg'}
						variant={'outline'}
						asChild
						className='w-fit rounded-full'
					>
						<Link href={`/dashboard/videos/${'videoId'}`}>
							<span>Go to video</span>
							<Video />
						</Link>
					</Button>

					<Button
						size={'lg'}
						variant={'secondary'}
						asChild
						className='w-fit rounded-full'
					>
						<Link href={`/dashboard/videos/${'videoId'}`}>
							<span>See comments (29)</span>
						</Link>
					</Button>
				</div>
			</div>
		</>
	)
}

export default LatestVideo
