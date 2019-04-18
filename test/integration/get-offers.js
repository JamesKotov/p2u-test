'use strict';

const test = require('ava');

const server = require('../../app/app');
const {chai, validateResponse} = require('../helpers/validator');

test('should return index page', async t => {
  const res = await chai.request(server)
    .get('/');

  t.is(res.status, 200);
  t.true(await validateResponse(res, '/', "get"))
});
