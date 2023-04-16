const Users = require("./users");
const Products = require("./products");
const BuyOrders = require("./buy_orders");
const SellOrders = require("./sell_orders");
const CompletedOrders = require("./completed_orders");
const UserAuth = require("./user_auth");

// Define associations
Users.hasMany(BuyOrders, { foreignKey: "user_id" });
BuyOrders.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(SellOrders, { foreignKey: "user_id" });
SellOrders.belongsTo(Users, { foreignKey: "user_id" });

Products.hasMany(BuyOrders, { foreignKey: "product_id" });
BuyOrders.belongsTo(Products, { foreignKey: "product_id" });

Products.hasMany(SellOrders, { foreignKey: "product_id" });
SellOrders.belongsTo(Products, { foreignKey: "product_id" });

BuyOrders.hasOne(CompletedOrders, { foreignKey: "buy_order_id" });
CompletedOrders.belongsTo(BuyOrders, { foreignKey: "buy_order_id" });

SellOrders.hasOne(CompletedOrders, { foreignKey: "sell_order_id" });
CompletedOrders.belongsTo(SellOrders, { foreignKey: "sell_order_id" });

module.exports = {
  Users,
  Products,
  BuyOrders,
  SellOrders,
  CompletedOrders,
  UserAuth,
};