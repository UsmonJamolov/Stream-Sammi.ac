import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ protocol: 'https', hostname: '*', pathname: '**' }],
	},
	// eslint: {
	// 	ignoreDuringBuilds: true, // skips all ESLint errors at build time
	// },
}

export default nextConfig
