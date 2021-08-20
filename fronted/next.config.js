module.exports = {
  async rewrites() {
    return [
        {
            destination: process.env.DESTINATION_URL,
            source: process.env.SOURCE_PATH,
        },
    ];
  },
  reactStrictMode: true
}