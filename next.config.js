module.exports = {
    async rewrites() {
      return [
        {
          source: '/prueba/bold/transacciones/:path*',
          destination: 'https://bold-fe-api.vercel.app/api/:path*',
        },
      ];
    },
    trailingSlash: true,
    basePath: '',
    images: {
      loader: 'imgix',
      path: '',
    },
    distDir: 'out', // Esto especifica el directorio de salida para Next.js
  };