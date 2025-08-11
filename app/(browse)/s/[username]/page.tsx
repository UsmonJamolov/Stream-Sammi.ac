import UserInformation from '../../v/_components/user-information'

const StreamPage = () => {
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
					</div>
				</div>
				<div className='col-span-1'>
					<div className='bg-secondary p-4 rounded-md'></div>
				</div>
			</div>
		</>
	)
}

export default StreamPage
