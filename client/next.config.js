/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['static.vecteezy.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    }
}

module.exports = nextConfig
