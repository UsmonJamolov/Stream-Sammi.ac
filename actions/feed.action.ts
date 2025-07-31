'use server'

import { actionClient } from '@/lib/safe-action'

export const getHomeFeed = actionClient.action(async () => {
	await new Promise(resolve => setTimeout(resolve, 1000))
	return { feed: data }
})

const data = [
	{
		id: '1',
		thumbnail:
			'https://img.olympics.com/images/image/private/t_16-9_640/f_auto/v1538355600/primary/owtwv8todbwx68perkjz',
		createdAt: new Date('2025-02-01T12:00:00Z'),
		title: 'The Olympics',
		user: {
			id: '1',
			username: 'samar',
			avatar: 'https://github.com/shadcn.png',
			followedBy: 8,
		},
	},
	{
		id: '2',
		thumbnail:
			'https://img.olympics.com/images/image/private/t_social_share_thumb/f_auto/primary/qjxgsf7pqdmyqzsptxju',
		createdAt: new Date('2025-01-02T12:00:00Z'),
		title:
			'The football Olympics 2025 in Paris is going to be the best one yet',
		user: {
			id: '1',
			username: 'oman',
			avatar: 'https://github.com/shadcn.png',
			followedBy: 8,
		},
	},
]
