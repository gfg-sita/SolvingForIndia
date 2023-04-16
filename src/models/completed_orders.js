const { DataTypes } = require("sequelize");
const { cockroach } = require("../db/sequelize");

const CompletedOrders = cockroach.define("completed_orders", {
  completed_order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  buy_order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "buy_orders",
      key: "buy_order_id",
    },
  },
  sell_order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "sell_orders",
      key: "sell_order_id",
    },
  },
  completion_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = CompletedOrders;