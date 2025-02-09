/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "**",
            },
            {
                protocol: 'http',
                hostname: "**",
            },
            {
                protocol: 'https',
                hostname: "static.pib.gov.in"
            }
        ]
    },
};

export default nextConfig;
