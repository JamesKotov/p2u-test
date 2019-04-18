/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('clicks', {
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
    hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.literal('current_timestamp')
    }
  }, {
    tableName: 'clicks',
    timestamps: false
  })
};
