'use strict';

const test = require('ava');

const server = require('../../app/app');
const {chai, validateResponse} = require('../helpers/validator');

test('should pass healthcheck', async t => {
    const res = await chai.request(server)
      .get('/_health');

    t.is(res.status, 200);
    t.true(await validateResponse(res, '/_health', "get"))
});
