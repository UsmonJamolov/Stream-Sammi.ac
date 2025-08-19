'use client'

import { UploadDropzone } from '@/lib/uploadthing'
import { useUploadVideo } from '@/store/use-upload-video'
import { useState } from 'react'
import { toast } from 'sonner'

const Dropzone = () => {
	const [toastId, setToastId] = useState<string | null>(null)
	const { setStep, setProgress } = useUploadVideo()

	return (
		<UploadDropzone
			endpoint={'videoUploader'}
			onClientUploadComplete={res => {
				console.log('res', res)
				toast.success('Video uploaded successfully!', {
					id: 'uploading-video',
				})
			}}
			onUploadProgress={progress => {
				if (!toastId) {
					const id = toast.loading(`Uploading video ${progress.toFixed(0)}%`, {
						id: 'uploading-video',
					})
					setToastId(`${id}`)
				} else {
					toast.loading(toastId, { id: 'uploading-video' })
				}
			}}
			onUploadBegin={() => {
				setStep(2)
				setProgress(33)
			}}
			uploadProgressGranularity='all'
			config={{ mode: 'auto', appendOnPaste: true }}
		/>
	)
}

export default Dropzone
