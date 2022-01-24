const { getRoutes, updateRoute } = require('./routes');
const fs = require('fs')
const yaml = require('js-yaml');
const { VGS_CLIENT_ID, VGS_CLIENT_SECRET, VGS_VAULT_ID} = process.env;

async function run() {
  console.log('run');
  // const routes = await getRoutes('tntdx8oynfd');
  // console.log('routes', routes);
}

function getRouteConfig(path = './vgs/routes.yaml') {
  if (fs.existsSync(path)) {
    return yaml.load(fs.readFileSync(path, 'utf8'));
  } else {
    return null;
  }
}

module.exports = {
  onPreBuild: async (params) => {
    console.log("Hello world from onPreBuild event!")
    console.log('params', params);

    // await run();

    const routeConfig = getRouteConfig();

    if(routeConfig) {
      console.log('starting route update')
      const res = await updateRoute(VGS_VAULT_ID, routeConfig);

      console.log('finish route update!', res)
    }
  },
}