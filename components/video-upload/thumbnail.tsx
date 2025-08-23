import { updateVideo } from '@/actions/video.action'
import { UploadDropzone } from '@/lib/uploadthing'
import { showToastError } from '@/lib/utils'
import { useUploadVideo } from '@/store/use-upload-video'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Thumbnail = () => {
	const { videoId } = useUploadVideo()
	const router = useRouter()

	const updateThumbnail = async (url: string) => {
		const response = await updateVideo({ videoId, thumbnail: url })
		showToastError(response)
		toast.success('Thumbnail updated successfully!')
		router.push(`/dashboard/videos/${videoId}`)
	}

	return (
		<UploadDropzone
			endpoint={'imageUploader'}
			onClientUploadComplete={res => updateThumbnail(res[0].ufsUrl)}
			uploadProgressGranularity='all'
			config={{ mode: 'auto', appendOnPaste: true }}
		/>
	)
}

export default Thumbnail
