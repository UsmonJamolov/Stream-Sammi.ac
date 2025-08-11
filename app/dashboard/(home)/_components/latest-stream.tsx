import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const LatestStream = () => {
	return (
		<>
			<div className='p-4 border rounded-xl'>
				<h3 className='text-lg font-space_grotesk font-semibold'>
					Latest Stream
				</h3>

				<div className='w-full relative h-44 mt-4'>
					<div className='absolute inset-0 z-40 bg-gradient-to-t from-primary rounded-lg' />
					<Image
						src={
							'https://img.olympics.com/images/image/private/t_social_share_thumb/f_auto/primary/qjxgsf7pqdmyqzsptxju'
						}
						alt='alt'
						fill
						className='object-cover rounded-lg'
					/>
					<div className='absolute bottom-0 z-50 p-2 text-lg font-space_grotesk font-bold text-primary-foreground leading-4'>
						The football Olympics 2025 in Paris is going to be the best one yet
					</div>
				</div>

				<Button
					asChild
					size={'lg'}
					className='rounded-full mt-4'
					variant={'outline'}
				>
					<Link href={'/dashboard/stream'}>Stream details</Link>
				</Button>
			</div>
		</>
	)
}

export default LatestStream
