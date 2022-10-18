const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const MongoStore = require('connect-mongo');
const models = require('./models');
const config = require('./config');
const DataMigration = require('./migration');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = config.appName;
const adapterConfig = config.adapter;

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  sessionStore: MongoStore.create({ mongoUrl: adapterConfig.mongoUri }),
  cookieSecret: config.cookieSecret,
  secureCookies: false,
  onConnect: process.env.CREATE_TABLES === 'true' && DataMigration,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Default to true in production
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: false,
  },
  appVersion: {
    version: '1.0.0',
    addVersionToHttpHeaders: false,
    access: true,
  }
});


// ready for models
models(keystone);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'email',
    secretField: 'password', 
    protectIdentities: true,
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      hooks: require.resolve('./views'),
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
  configureExpress: app => {
    app.set('trust proxy', 1);
  },
};
