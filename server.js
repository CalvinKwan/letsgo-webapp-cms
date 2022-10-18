const express = require('express');

// const expressSession = require('express-session');
// const MongoStore = require('connect-mongo');
const { keystone, apps } = require('.');
const routes = require('./routes');
const config = require('./config');

// console.log(keystone);

keystone.prepare({
  apps,
  dev: config.dev,
}).then(async ({ middlewares }) => {
  middlewares.forEach(app=>{
    // console.log(app.disable);
    if ( app.disable ) {
      app.disable('x-powered-by');
    }
  })
  keystone.middlewares = middlewares;
  await keystone.connect();
  const app = express();
  app.disable('x-powered-by');
  Object.defineProperty(app.request, 'secure', {
    configurable: true,
    enumerable: true,
    get: function () { return true }
  })
  routes(keystone, app);
  
  // prepare Restful API
  app.use(middlewares);
  app.listen(config.port);
  

  console.log(
    '\x1b[36m%s\x1b[0m',
    `Server is starting at port: ${config.port}`,
  );

});