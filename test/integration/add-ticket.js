'use strict';

const test = require('ava');

const server = require('../../app/app');
const {chai, validateResponse} = require('../helpers/validator');

test('should not found offer page', async t => {
  const res = await chai.request(server)
    .post('/offers/123')
    .send({})
  ;

  t.is(res.status, 404);
  t.true(await validateResponse(res, '/offers/{offerId}', "post"))
});

test('should return bad request error', async t => {
  const res = await chai.request(server)
    .post('/offers/1')
    .send({})
  ;

  t.is(res.status, 400);
  t.true(await validateResponse(res, '/offers/{offerId}', "post"))
});

test('should return success', async t => {
  const res = await chai.request(server)
    .post('/offers/1')
    .send({
      order_id: 'test',
      order_sum: 123,
      comment: "no comments",
      clicks: [3, 4]
    })
  ;

  t.is(res.status, 200);
  t.true(await validateResponse(res, '/offers/{offerId}', "post"))
});
