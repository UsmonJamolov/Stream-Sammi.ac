import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ protocol: 'https', hostname: '*', pathname: '**' }],
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'error',
	},
}

export default nextConfig
