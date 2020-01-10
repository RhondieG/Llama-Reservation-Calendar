'use strict';
module.exports = (sequelize, DataTypes) => {
  const feed = sequelize.define('feed', {
    feed: DataTypes.STRING
  }, {});
  feed.associate = function(models) {
    // associations can be defined here
  };
  return feed;
};