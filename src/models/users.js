const { DataTypes } = require("sequelize");
const { cockroach } = require("../db/sequelize");

const Users = cockroach.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    mobile_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    registered_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    password: { // Add this new field definition
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Users;
