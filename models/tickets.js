/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tickets', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    offer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'offers',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    order_sum: {
      type: DataTypes.REAL,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    clicks: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'tickets',
    timestamps: false
  })
};
