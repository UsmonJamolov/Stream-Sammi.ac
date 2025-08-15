import { Button } from '@/components/ui/button'
import { columns } from '../_components/columns'
import { DataTable } from '../_components/data-table'
import { Separator } from '@/components/ui/separator'
import { getHomeFeed } from '@/actions/feed.action'

const Page = async () => {
	const data = await getHomeFeed()

	const feed = data?.data?.feed

	const formattedData = feed?.map(item => ({
		id: item.id,
		thumbnail: item.thumbnail,
		title: item.title,
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		visibility: 'Public',
		createdAt: item.createdAt,
		views: 100,
		comments: 20,
		likes: 50,
	}))

	return (
		<>
			<div className='flex justify-between items-start'>
				<div className='flex flex-col'>
					<h1 className='text-2xl font-bold font-space_grotesk'>Videos</h1>
					<p className='text-sm text-muted-foreground'>
						Manage your videos, you can upload, edit, delete and view your
						videos here.
					</p>
				</div>
				<Button size={'sm'}>Upload Video</Button>
			</div>
			<Separator className='my-3' />
			{/* @ts-expect-error as @ts-ignore */}
			<DataTable columns={columns} data={formattedData} />
		</>
	)
}

export default Page
