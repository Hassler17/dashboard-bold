// next.config.js
module.exports = {
    async headers() {
      return [
        {
          source: '/prueba/bold/transacciones/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
            },
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
          ],
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/prueba/bold/transacciones/:path*',
          destination: 'https://bold-fe-api.vercel.app/api/:path*',
        },
      ];
    },
  };
  