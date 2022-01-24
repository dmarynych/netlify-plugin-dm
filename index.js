const { getRoutes } = require('./routes');

async function run() {
  console.log('run');
  const routes = await getRoutes('tntdx8oynfd');
  console.log('routes', routes);
}

module.exports = {
  onPreBuild: async ({ constants }) => {
    console.log("Hello world from onPreBuild event!")
    console.log('constants', constants);

    await run();
  },
}