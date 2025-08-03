import { getFollowing } from '@/actions/user.action'
import UserAvatar from '@/components/shared/user-avatar'
import Link from 'next/link'

const LivesPage = async () => {
	const response = await getFollowing()

	const lives = response?.data?.following || []

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
			{lives.map(live => (
				<Link href={`/s/${live.id}`} key={live.id}>
					<div className='w-full h-56 flex items-center justify-center bg-secondary rounded-lg flex-col'>
						<UserAvatar
							username={live.username}
							avatar={live.avatar}
							isLive
							showBadge
							size={'lg'}
						/>
						<div>
							<h1 className='font-space_grotesk text-lg mt-4 text-center'>
								<span className='capitalize'>{live.username}</span> is live
							</h1>
							<p className='line-clamp-2 text-sm text-center text-muted-foreground leading-4'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
								Voluptatum praesentium repellendus facilis doloremque molestiae
								a tenetur eveniet, molestias mollitia nam ratione hic rem est.
								Magni quibusdam dolorum consectetur cumque exercitationem.
							</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export default LivesPage
