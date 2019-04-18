/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('offers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'offers',
    timestamps: false
  })
};
