import { getStream } from '@/actions/dashboard.action'
import { getAuthorizedUser } from '@/actions/user.action'
import StreamContent from '@/components/stream/stream-content'

const Page = async () => {
	const { user } = await getAuthorizedUser()
	const streamRes = await getStream()

	if (!streamRes || !streamRes.data || !streamRes?.data?.stream) {
		return <div>Stream not found</div>
	}

	const stream = streamRes.data.stream

	return <StreamContent user={user} stream={stream} />
}

export default Page