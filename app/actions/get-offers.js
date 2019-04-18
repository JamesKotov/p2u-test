'use strict';

const db = require('../../models');

module.exports = async (ctx, next) => {
  let offers;
  try {
    offers = await db.offers.findAll()
  } catch (e) {
    ctx.log.error(e);
    ctx.status = 500;
    return ctx.render('error_500')
  }
  await ctx.render('offers', {
    offers
  })
};
