'use strict';

const db = require('./models');

db.sequelize.sync()
  .then(() => {
    require('./app/app');
  });



