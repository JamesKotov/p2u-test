'use strict';

const Koa = require('koa');
const path = require('path');
const pino = require('pino');
const render = require('koa-ejs');
const { KoaReqLogger } = require('koa-req-logger');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const router = require('./middleware/router');

const isTest = env === "test";

const app = new Koa();
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

const pinoLogger = pino({
  useLevelLabels: true,
  timestamp: pino.stdTimeFunctions.unixTime
});

if (!isTest) {
  const logger = new KoaReqLogger({
    pinoInstance: pinoLogger,
    alwaysError: true // treat all non-2** http codes as error records in logs
  });
  app.use(logger.getMiddleware());
}

render(app, {
  root: path.join(__dirname, '/../templates'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: false
});

app.use(router.routes());
app.use(router.allowedMethods());

// server
const port = config.port;
const server = app.listen(port, () => {
  if (!isTest) pinoLogger.info(`Server listening on port: ${port}`)
});

module.exports = server;
