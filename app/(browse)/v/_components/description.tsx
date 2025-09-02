import { formatDistanceToNow } from 'date-fns'

interface Props {
	views: number
	createdAt: Date
	description: string
}

const Description = ({ createdAt, description, views }: Props) => {
	return (
		<div className='bg-secondary p-4 rounded-md my-4'>
			<div className='flex items-center gap-x-2 text-sm'>
				<p>{views} views</p>
				<div className='size-1 rounded-full bg-primary' />
				<p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
			</div>
			<h2 className='mt-2 font-space_grotesk text-xl font-bold'>Description</h2>
			<div
				className='text-xs'
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		</div>
	)
}

export default Description
