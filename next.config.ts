import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // السماح بالاتصال من أي جهاز في الشبكة
  allowedDevOrigins: ['*'],
  
  // إضافة headers للـ CORS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
        ],
      },
    ];
  },

  // إعدادات الصور (الطريقة الجديدة)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;