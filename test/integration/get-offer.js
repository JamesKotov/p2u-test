'use strict';

const test = require('ava');

const server = require('../../app/app');
const {chai, validateResponse} = require('../helpers/validator');

test('should return offer page', async t => {
  const res = await chai.request(server)
    .get('/offers/1');

  t.is(res.status, 200);
  t.true(await validateResponse(res, '/offers/{offerId}', "get"))
});

test('should return 404 error if offer page is not found', async t => {
  const res = await chai.request(server)
    .get('/offers/113213');

  t.is(res.status, 404);
  t.true(await validateResponse(res, '/offers/{offerId}', "get"))
});
