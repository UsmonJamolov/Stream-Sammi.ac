import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ protocol: 'https', hostname: '*', pathname: '**' }],
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
	},
	eslint: {
		ignoreDuringBuilds: true, // skips all ESLint errors at build time
	},
}

export default nextConfig
