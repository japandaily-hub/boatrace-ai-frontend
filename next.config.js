/** @type {import('next').NextConfig} */
const nextConfig = {
  // 本番APIへのリバースプロキシ設定
  // NEXT_PUBLIC_API_BASE 未設定時はモックAPIを使用
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    if (!apiBase) return [];
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${apiBase}/:path*`,
      },
    ];
  },
  // 画像ドメイン許可
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
