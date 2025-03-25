const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ad = sequelize.define('Ad', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
 
}, 
  
);

module.exports = Ad;
