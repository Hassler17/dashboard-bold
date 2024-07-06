module.exports = {
    async rewrites() {
        return [
            {
                source: '/prueba/bold/transacciones/:path*',
                destination: 'https://bold-fe-api.vercel.app/api/:path*'
            }
        ]
    }
}