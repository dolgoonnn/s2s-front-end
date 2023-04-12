/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        apiUrl:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:8000' // development api
                : 'https://api.monk.mn', // production api
    },
};

module.exports = nextConfig;
