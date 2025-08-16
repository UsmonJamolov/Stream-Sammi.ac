import { Switch } from '@/components/ui/switch'

interface StreamKeyCardProps {
	label: string
	field: string
	value: boolean
}

const StreamKeyCard = ({ field, label, value = false }: StreamKeyCardProps) => {
	return (
		<div key={field} className='flex justify-between items-start py-4 border-b'>
			<div className='flex flex-col'>
				<h2 className='font-semibold'>{label}</h2>
			</div>
			<Switch>{value ? 'On' : 'Off'}</Switch>
		</div>
	)
}

export default StreamKeyCard
