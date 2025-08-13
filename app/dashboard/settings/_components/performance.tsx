import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import SocialMediaCard from './social-media-card'
import { FacebookIcon, TelegramIcon, TwitterIcon, VKIcon } from 'react-share'
import { LogOut, LucideIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { SignOutButton } from '@clerk/nextjs'

const Performance = () => {
	const [bioValue, setBioValue] = useState<string>('')
	const { resolvedTheme, setTheme } = useTheme()

	return (
		<div className='bg-sidebar p-4 lg:p-6 rounded-lg'>
			<h1 className='text-2xl font-space_grotesk font-bold'>Performance</h1>

			<Separator className='my-2' />

			<Accordion type='single' collapsible>
				<AccordionItem value='item-1'>
					<AccordionTrigger>
						<div className='flex flex-col space-y-0'>
							<h2 className='text-lg font-semibold font-space_grotesk'>Bio</h2>
							<p className='text-sm text-muted-foreground'>
								Bio is not provided
							</p>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<form>
							<Textarea
								className='bg-secondary resize-none h-32 focus-visible:ring-0'
								placeholder='Tell us about yourself. This will be displayed on your profile. e.g I am a professional gamer and I love playing games.'
								value={bioValue}
								onChange={e => setBioValue(e.target.value)}
							/>
							<Button className='mt-2 ml-auto flex' size={'sm'} type='submit'>
								<span>Save</span>
							</Button>
						</form>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value='item-2'>
					<AccordionTrigger>
						<h2 className='text-lg font-semibold font-space_grotesk'>
							Social media
						</h2>
					</AccordionTrigger>
					<AccordionContent>
						<div className='grid grid-cols-2 gap-4'>
							<SocialMediaCard
								icon={FacebookIcon as LucideIcon}
								value='https://facebook.com'
								socialMedia='facebook'
							/>
							<SocialMediaCard
								icon={TelegramIcon as LucideIcon}
								value='https://telegram.com'
								socialMedia='telegram'
							/>
							<SocialMediaCard
								icon={TwitterIcon as LucideIcon}
								value='https://twitter.com'
								socialMedia='twitter'
							/>
							<SocialMediaCard
								icon={VKIcon as LucideIcon}
								value='https://vk.com'
								socialMedia='vkontakte'
							/>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div className='flex justify-between items-start py-4 border-b'>
				<div className='flex flex-col'>
					<h2 className='text-lg font-semibold font-space_grotesk'>
						Appearance
					</h2>
					<p className='text-muted-foreground text-sm'>
						Change the appearance of your profile. You can change the theme
					</p>
				</div>
				<Switch
					checked={resolvedTheme === 'dark'}
					onCheckedChange={() =>
						setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
					}
				/>
			</div>

			<div className='flex justify-between items-start py-4 border-b'>
				<div className='flex flex-col'>
					<h2 className='text-lg font-semibold font-space_grotesk'>Exit</h2>
					<p className='text-muted-foreground text-sm'>
						Exit the application and log out of your account on all devices.
					</p>
				</div>
				<SignOutButton redirectUrl='/'>
					<Button size={'sm'} variant={'destructive'}>
						<span>Logout</span>
						<LogOut />
					</Button>
				</SignOutButton>
			</div>
		</div>
	)
}

export default Performance
