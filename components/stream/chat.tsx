import {
	useChat,
	useConnectionState,
	useRemoteParticipant,
} from '@livekit/components-react'
import { Stream } from '@prisma/client'
import { ConnectionState } from 'livekit-client'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Send } from 'lucide-react'
import ChatCard from './chat-card'
import FormInfo from './form-info'

interface ChatProps {
	hostId: string
	stream: Stream
}

const Chat = ({ hostId, stream }: ChatProps) => {
	const [value, setValue] = useState<string>('')

	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(hostId)
	const { chatMessages, send } = useChat()

	const isOnline = participant && connectionState === ConnectionState.Connected
	const isHidden = !isOnline && !stream.isChatEnabled

	const sendMessage = (value: string) => {
		if (!send) return

		send(value)
		setValue('')
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()

		if (!value) return

		sendMessage(value)
	}

	return (
		<div className='h-full relative'>
			<div className='border-b text-center pb-2 font-semibold font-space_grotesk text-lg'>
				Stream chat
			</div>

			<div className='h-full flex flex-col'>
				<div className='h-96 flex flex-col-reverse overflow-y-auto'>
					{isHidden || !chatMessages.length || !chatMessages ? (
						<div className='flex-1 flex items-center justify-center'>
							<p className='text-center text-muted-foreground text-xs'>
								{isHidden ? 'Chat is disabled' : 'No messages yet'}
							</p>
						</div>
					) : (
						chatMessages
							.map((msg, i) => <ChatCard key={i} msg={msg} />)
							.reverse()
					)}
				</div>

				{!isHidden && (
					<div className='flex flex-col items-start absolute bottom-0 w-full'>
						<FormInfo
							isDelayed={stream.isDelayed}
							isFollowersOnly={stream.isFollowersOnly}
						/>
						<form className='flex items-center w-full' onSubmit={onSubmit}>
							<div className='flex-1'>
								<Input
									className='bg-secondary rounded-r-none rounded-l-none focus-visible:ring-0'
									placeholder='Send a message'
									value={value}
									onChange={e => setValue(e.target.value)}
								/>
							</div>
							<Button size={'sm'} type='submit' className='rounded-none'>
								<Send />
							</Button>
						</form>
					</div>
				)}
			</div>
		</div>
	)
}

export default Chat