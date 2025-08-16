import { Separator } from '@/components/ui/separator'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'

const Page = () => {
	const formattedData = [
		{
			id: '1',
			content: 'The Olympics are coming soon, are you ready?',
			createdAt: new Date('2025-02-01T12:00:00Z'),
			user: { username: 'samar', avatar: 'https://github.com/shadcn.png' },
			video: {
				title: 'The Olympics',
				thumbnail:
					'https://img.olympics.com/images/image/private/t_16-9_640/f_auto/v1538355600/primary/owtwv8todbwx68perkjz',
				description: 'Olympics 2025, in Paris is going to be the best one yet',
			},
		},
	]

	return (
		<>
			<div className='w-full lg:w-1/2'>
				<h1 className='text-2xl font-bold font-space_grotesk'>Community</h1>
				<p className='text-sm text-muted-foreground'>
					Welcome to the community page. here you can view and interact with
					other members.
				</p>
			</div>
			<Separator className='my-2' />
			<DataTable columns={columns} data={formattedData} />
		</>
	)
}

export default Page
