module.exports = {
  launch: {
    headless: process.env.CI === 'true',
  },
  server: {
    command: 'npm run serve:examples',
    port: 4444,
  },
};
