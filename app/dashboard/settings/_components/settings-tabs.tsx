'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Profile from './profile'
import Performance from './performance'
import StreamKey from './stream-key'

type TabValue = 'profile' | 'performance' | 'stream'

const SettingsTabs = () => {
	const [tabValue, setTabValue] = useState<TabValue>('profile')

	const onToggleTab = (value: TabValue) => setTabValue(value)

	return (
		<div className='grid grid-cols-4 gap-x-6'>
			<div className='col-span-1 flex flex-col space-y-1'>
				{tab_items.map(item => (
					<Button
						className='justify-start'
						onClick={() => onToggleTab(item.value as TabValue)}
						variant={tabValue === item.value ? 'default' : 'ghost'}
						key={item.value}
					>
						{item.label}
					</Button>
				))}
			</div>

			<div className='col-span-3'>
				{tabValue === 'profile' && <Profile />}
				{tabValue === 'performance' && <Performance />}
				{tabValue === 'stream' && <StreamKey />}
			</div>
		</div>
	)
}

export default SettingsTabs

const tab_items = [
	{ label: 'Profile', value: 'profile' },
	{ label: 'Performance', value: 'performance' },
	{ label: 'Stream key', value: 'stream' },
]
