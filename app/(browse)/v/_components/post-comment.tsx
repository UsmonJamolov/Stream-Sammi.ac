'use client'

import UserAvatar from '@/components/shared/user-avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import { Send } from 'lucide-react'

const PostComment = () => {
	const { user } = useUser()

	return (
		<div className='flex items-center gap-x-4 mt-2'>
			<UserAvatar
				username={user?.username || 'Anonymous'}
				avatar={user?.imageUrl || ''}
			/>
			<form className='flex flex-1'>
				<Input
					className='rounded-r-none w-full bg-secondary border-r border-r-secondary-foreground/50 focus-visible:ring-0 font-space_grotesk h-10'
					placeholder='Add a public comment...'
				/>
				<Button className='rounded-l-none border-none h-10' size={'icon'}>
					<Send />
				</Button>
			</form>
		</div>
	)
}

export default PostComment
