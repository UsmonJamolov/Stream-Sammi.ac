import { Separator } from '@/components/ui/separator'
import LatestVideo from './_components/latest-video'
import LatestStream from './_components/latest-stream'
import PublishedVideo from './_components/published-video'
import Subscribers from './_components/subscribers'
import LatestComments from './_components/latest-comments'

const DashboarPage = () => {
	return (
		<>
			<div className='w-full lg:w-1/2'>
				<h2 className='text-2xl font-space_grotesk font-bold'>
					Channel dashboard
				</h2>
				<p className='text-sm text-muted-foreground'>
					Welcome to your channel dashboard. Here you can view your channel
					analytics, manage your videos, and more.
				</p>
			</div>

			<Separator className='my-2' />

			<div className='grid grid-cols-3 gap-4 mt-4'>
				<LatestVideo />
				<div className='space-y-6'>
					<LatestStream />
					<PublishedVideo />
				</div>
				<div className='space-y-6'>
					<Subscribers />
					<LatestComments />
				</div>
			</div>
		</>
	)
}

export default DashboarPage
