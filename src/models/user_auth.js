const { DataTypes } = require("sequelize");
const { cloudSQL } = require("../db/sequelize");

const UserAuth = cloudSQL.define("user_auth", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  login_time: {
    type: DataTypes.DATE,
    primaryKey: true,
    allowNull: false,
  },
  ip_address: {
    type: DataTypes.STRING(50),
  },
  browser: {
    type: DataTypes.STRING(50),
  },
  device_type: {
    type: DataTypes.STRING(50),
  },
}, {
  timestamps: false,
});

module.exports = UserAuth;
