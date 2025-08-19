import './globals.css'

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import ClerkProvider from '@/components/providers/clerk-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Montserrat, Space_Grotesk } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { ourFileRouter } from './api/uploadthing/core'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
})

const space_Grotesk = Space_Grotesk({
	variable: '--font-space-grotesk',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Stream Sammi',
	description: "Stream Sammi is a platform for streaming Sammi's content.",
}

interface RootLayoutProps {
	children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body
				suppressHydrationWarning={true}
				className={`${montserrat.variable} ${space_Grotesk.variable} antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
					storageKey='sammi-theme'
				>
					<ClerkProvider>
						<Toaster />
						<NextTopLoader showSpinner={false} />
						<NextSSRPlugin
							/**
							 * The `extractRouterConfig` will extract **only** the route configs
							 * from the router to prevent additional information from being
							 * leaked to the client. The data passed to the client is the same
							 * as if you were to fetch `/api/uploadthing` directly.
							 */
							routerConfig={extractRouterConfig(ourFileRouter)}
						/>
						{children}
					</ClerkProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
