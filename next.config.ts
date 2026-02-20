/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/events", destination: "/", permanent: true },
      { source: "/drinks", destination: "/menu", permanent: true },
    ];
  },
};

module.exports = nextConfig;