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
import { BadgePlus } from 'lucide-react'
import { Progress } from '../ui/progress'
import { useUploadVideo } from '@/store/use-upload-video'
import Dropzone from './dropzone'

interface UploadVideoProps {
	isGlobal?: boolean
}

const UploadVideo = ({ isGlobal = false }: UploadVideoProps) => {
	const { step, progress } = useUploadVideo()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div>
					{isGlobal && (
						<Button size={'sm'} variant={'ghost'}>
							<span>Create</span>
							<BadgePlus />
						</Button>
					)}
					{!isGlobal && <Button size={'sm'}>Upload Video</Button>}
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload video</DialogTitle>
					<DialogDescription>
						Upload your video to share with your friends and followers on your
						profile.
					</DialogDescription>
				</DialogHeader>
				<Progress value={progress} />
				<div className='text-center font-space_grotesk font-boldtext-s'>
					{step}/3 step
				</div>
				{step === 1 && <Dropzone />}
				{step === 2 && <p>Step 2</p>}
			</DialogContent>
		</Dialog>
	)
}

export default UploadVideo
