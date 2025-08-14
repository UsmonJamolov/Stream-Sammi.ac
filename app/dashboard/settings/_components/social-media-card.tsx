import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LucideIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

type SocialMediValue = 'facebook' | 'twitter' | 'telegram' | 'vkontakte'

interface SocialMediaCardProps {
	value: string
	socialMedia: SocialMediValue
	icon: LucideIcon
}

const SocialMediaCard = ({ icon: Icon, value }: SocialMediaCardProps) => {
	const [val, setValue] = useState(value)

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	return (
		<div className='bg-secondary flex p-0 gap-x-2 justify-start'>
			<Icon className='!h-8 !w-12' />
			<Input
				className='bg-secondary p-0 text-sm focus-visible:ring-0 h-full'
				value={val}
				onChange={onInputChange}
			/>
			<Button size={'sm'} className='rounded-l-none h-full'>
				Save
			</Button>
		</div>
	)
}

export default SocialMediaCard
