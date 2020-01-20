'use strict';
module.exports = (sequelize, DataTypes) => {
  const llama = sequelize.define('llama', {
    name: DataTypes.STRING,
    origin: DataTypes.STRING,
    feed_id: DataTypes.INTEGER,
    image_url: DataTypes.TEXT
  }, {});
  llama.associate = function(models) {
    llama.belongsTo(models.feed, { foreignKey: 'feed_id', })
  };
  return llama;
};