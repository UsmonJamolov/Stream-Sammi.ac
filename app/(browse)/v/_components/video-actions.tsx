'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Download, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'
import {
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	TelegramIcon,
	TelegramShareButton,
	TwitterIcon,
	TwitterShareButton,
	VKIcon,
	VKShareButton,
} from 'react-share'

interface VideoActionsProps {
	reaction: 'LIKE' | 'DISLIKE' | null
}

const VideoActions = ({ reaction }: VideoActionsProps) => {
	return (
		<div className='flex items-center gap-x-2'>
			<div className='rounded-full flex items-center'>
				<Button
					size={'sm'}
					className='rounded-full rounded-r-none border-r hover:bg-secondary/20 border-r-secondary-foreground/50'
					variant={'secondary'}
				>
					<ThumbsUp className={cn(reaction === 'LIKE' && 'fill-foreground')} />
					<span>Like</span>
				</Button>
				<Button
					size={'sm'}
					className='rounded-full rounded-l-none hover:bg-secondary/20'
					variant={'secondary'}
				>
					<ThumbsDown
						className={cn(reaction === 'DISLIKE' && 'fill-foreground')}
					/>
				</Button>
			</div>

			<Dialog>
				<DialogTrigger asChild>
					<Button
						size={'sm'}
						className='rounded-full hover:bg-primary/20'
						variant={'secondary'}
					>
						<Share2 />
						<span>Share</span>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Share in a post</DialogTitle>
						<DialogDescription />
					</DialogHeader>
					<Separator />
					<h2 className='font-space_grotesk text-2xl font-bold text-center'>
						Share
					</h2>

					<div className='flex items-center gap-x-2 justify-center'>
						<TelegramShareButton
							url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/v/1`}
						>
							<TelegramIcon round />
						</TelegramShareButton>

						<FacebookShareButton
							url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/v/1`}
						>
							<FacebookIcon round />
						</FacebookShareButton>

						<LinkedinShareButton
							url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/v/1`}
						>
							<LinkedinIcon round />
						</LinkedinShareButton>

						<VKShareButton url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/v/1`}>
							<VKIcon round />
						</VKShareButton>

						<TwitterShareButton
							url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/v/1`}
						>
							<TwitterIcon round />
						</TwitterShareButton>
					</div>

					<div className='flex items-center justify-between bg-secondary p-2 border rounded-full gap-x-4 mt-4'>
						<div className='flex-1 line-clamp-1 text-sm'>
							{process.env.NEXT_PUBLIC_DOMAIN_URL}/v/1
						</div>
						<Button
							className='rounded-full font-bold font-space_grotesk'
							onClick={() =>
								navigator.clipboard
									.writeText(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/v/1`)
									.then(() =>
										toast({ variant: 'default', description: 'Copied!' })
									)
							}
						>
							Copy
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<Button
				size={'sm'}
				className='rounded-full hover:bg-primary/20'
				variant={'secondary'}
			>
				<Download />
				<span>Download</span>
			</Button>
		</div>
	)
}

export default VideoActions
