const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./prisma/dev.db'],
    },
  },
};

export default nextConfig;
