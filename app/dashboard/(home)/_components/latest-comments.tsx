import UserAvatar from '@/components/shared/user-avatar'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

const LatestComments = () => {
	return (
		<div className='p-4 border rounded-xl'>
			<h3 className='text-lg font-space_grotesk font-semibold'>
				Latest comments
			</h3>
			<p className='text-muted-foreground text-xs'>Channel comments</p>
			<Separator className='my-2' />

			<div className='flex flex-col space-y-2'>
				{/* Map */}
				<div className='flex items-center justify-between'>
					<div className='flex items-start gap-x-2 flex-1'>
						<UserAvatar
							avatar='https://github.com/shadcn.png'
							username='samarbadriddin0v'
						/>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center text-xs gap-x-2'>
								<p>@samar0811</p>
								<div className='size-1 rounded-full bg-secondary-foreground' />
								<p>3 days ago</p>
							</div>
							<p className='text-xs line-clamp-2 leading-4'>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
								numquam placeat dolorem impedit? Unde, numquam in! Perspiciatis
								aliquam totam doloribus id, quo praesentium. Quam, aliquid quasi
								dolor adipisci cum eveniet?
							</p>
						</div>
					</div>

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
				</div>
			</div>
		</div>
	)
}

export default LatestComments
