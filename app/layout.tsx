import './globals.css'

import { ThemeProvider } from '@/components/providers/theme-provider'
import type { Metadata } from 'next'
import { Montserrat, Space_Grotesk } from 'next/font/google'
import ClerkProvider from '@/components/providers/clerk-provider'

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
					<ClerkProvider>{children}</ClerkProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
