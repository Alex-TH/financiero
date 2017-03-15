const env = require('node-env-file');
const express = require('express');
const { ParseServer } = require('parse-server');
const ParseDashboard = require('parse-dashboard');

if (!process.env.ENVIRONMENT) {
  env('./.env');
}

const allowInsecureHTTP = true;
const port = process.env.PORT || 4040;

const api = new ParseServer({
  databaseURI: process.env.DATABASE_URI,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,
  appName: process.env.APP_NAME,
});

const dashboard = new ParseDashboard({
  apps: [{
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY,
    serverURL: process.env.SERVER_URL,
    appName: process.env.APP_NAME,
  }],
  users: [{ user: 'test', pass: 'test' }],
}, allowInsecureHTTP);

const app = express();

app.use('/parse', api);

app.use('/dashboard', dashboard);

app.listen(port, () => {
  console.log(`Application started at port ${port}`);
});
