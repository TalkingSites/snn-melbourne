// Site: http://localhost:8150  SpaceDash with local files, no sign-in: http://localhost:8150/admin/
module.exports = {
  apps: [
    { name: 'snn-melbourne-website', script: 'npm', args: 'start -- --port 8150', cwd: __dirname },
    { name: 'snn-melbourne-website-cms', script: 'npx', args: 'decap-server', cwd: __dirname, env: { PORT: '8151' } },
  ],
};
