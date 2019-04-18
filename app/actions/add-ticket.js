'use strict';

const db = require('../../models');

module.exports = async (ctx, next) => {
  try {
    const offer_id = ctx.params.id;
    const messages = [];
    let offer;

    if (offer_id) {
      offer = await db.offers.findByPk(offer_id)
    }

    if (!offer) {
      ctx.status = 404;
      ctx.body = {
        messages: ['offer not found']
      };
      return
    }

    let { order_id, order_sum, comment, clicks } = ctx.request.body;

    order_sum = order_sum * 1;
    if (isNaN(order_sum) || order_sum <= 0) {
      messages.push('invalid sum')
    }

    if (!order_id) {
      messages.push('order_id required')
    }

    const offerClicks = [];
    const oc = await db.clicks.findAll({
      where: {
        offer_id: offer_id
      }
    });

    if (oc) {
      oc.forEach((clk) => {
        offerClicks.push(clk.get('id'));
      })
    }

    if (offerClicks.length) {
      if (typeof clicks === 'string') {
        clicks = [clicks];
      }

      if (!(Array.isArray(clicks) && clicks.length)) {
        messages.push('at least one checkbox must be checked')
      } else {
        let isValid = true;
        clicks.forEach((i) => {
          if (offerClicks.indexOf(i * 1) < 0) {
            isValid = false;
          }
        });
        if (!isValid) {
          messages.push('at least one if checkbox is invalid')
        }
      }
    } else {
      if (clicks) {
        messages.push('none checkboxes can be passed for this offer')
      }
    }

    if (messages.length) {
      ctx.status = 400;
      ctx.body = {
        messages: messages
      };
      return
    }

    comment = comment || '';

    clicks = JSON.stringify(clicks);
    const ticket = await db.tickets.create({ offer_id, order_id, order_sum, comment, clicks });
    ctx.body = {
      messages: [`your ticket id is ${ticket.get('id')}`]
    }
  } catch (e) {
    ctx.log.error(e);
    ctx.status = 500;
    ctx.body = {
      messages: ['internal system error occurred'],
      error: e.toString()
    };
    return
  }
  ctx.status = 200
};
