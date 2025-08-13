import { Separator } from '@/components/ui/separator'
import SettingsTabs from '../_components/settings-tabs'

const Page = () => {
	return (
		<>
			<h1 className='text-2xl font-bold font-space_grotesk'>Settings</h1>
			<p className='text-sm text-muted-foreground'>
				Settings page content goes here.
			</p>

			<Separator className='my-2' />

			<SettingsTabs />
		</>
	)
}

export default Page
