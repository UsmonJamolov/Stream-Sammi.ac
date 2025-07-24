'use client'

import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Clapperboard, Home, Layers2, TvMinimalPlay } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
	const pathname = usePathname()

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Pages</SidebarGroupLabel>
			<SidebarContent>
				<SidebarMenu>
					{navigation_items.map(item => (
						<SidebarMenuItem key={item.route}>
							<SidebarMenuButton asChild isActive={pathname === item.route}>
								<Link href={item.route}>
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
		</SidebarGroup>
	)
}

export default Navigation

const navigation_items = [
	{ title: 'Home', route: '/', icon: Home },
	{ title: 'Lives', route: '/lives', icon: Layers2 },
	{ title: 'Subscriptions', route: '/subscription', icon: TvMinimalPlay },
	{ title: 'Dashboard', route: '/dashboard', icon: Clapperboard },
]
