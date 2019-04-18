'use strict';

const Router = require('koa-router');
const convert = require('koa-convert');
const KoaBody = require('koa-body');

const health = require('../actions/health');
const getOffers = require('../actions/get-offers');
const getOffer = require('../actions/get-offer');
const addTicket = require('../actions/add-ticket');

const router = new Router();
const koaBody = convert(KoaBody({
  multipart: true
}));

router
  .get('/_health', health)
  .get('/', getOffers)
  .get('/offers/:id', getOffer)
  .post('/offers/:id', koaBody, addTicket);

module.exports.routes = function () {
  return router.routes()
};
module.exports.allowedMethods = function () {
  return router.allowedMethods()
};
