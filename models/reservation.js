'use strict';
module.exports = (sequelize, DataTypes) => {
  const reservation = sequelize.define('reservation', {
    user_id: DataTypes.INTEGER,
    date_reserved: DataTypes.DATE,
    llama_id: DataTypes.INTEGER
  }, {});
  reservation.associate = function(models) {
    // associations can be defined here
  };
  return reservation;
};

