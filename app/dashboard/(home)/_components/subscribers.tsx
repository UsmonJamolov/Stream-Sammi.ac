import UserAvatar from '@/components/shared/user-avatar'

const Subscribers = () => {
	return (
		<div className='p-4 border rounded-xl'>
			<h3 className='text-lg font-space_grotesk font-semibold'>
				Recent subscribers
			</h3>

			<div className='space-y-2 mt-4'>
				{/* Map */}
				<div className='flex itemsce gapy-4 h-full w-full rounded-md pb-2 gap-x-2'>
					<UserAvatar
						avatar='https://github.com/shadcn.png'
						username='samarbadriddin0v'
					/>

					<div className='flex flex-col space-y-0'>
						<p className='font-space_grotesk font-bold text-md'>
							@samarbadriddin0v
						</p>
						<p className='text-muted-foreground text-xs'>23 followers</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Subscribers
