'use strict';

const db = require('../../models');

module.exports = async (ctx, next) => {
  let offer;
  let clicks;
  try {
    const id = ctx.params.id;
    offer = await db.offers.findByPk(id);

    if (!offer) {
      ctx.status = 404;
      return ctx.render('error_404')
    }

    clicks = await db.clicks.findAll({
      where: {
        offer_id: id
      }
    })
  } catch (e) {
    ctx.log.error(e);
    ctx.status = 500;
    return ctx.render('error_500')
  }

  await ctx.render('offer', {
    offer,
    clicks
  })
};
