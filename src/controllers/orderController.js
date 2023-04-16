const { completedOrders } = require("../models/completed_orders");
const { Op } = require("sequelize");
const { getProductIdByName } = require("../utils/getProductIdByName");

exports.createSellOrder = async (req, res) => {
  try {
    const SellOrders = require("../models/sell_orders");
    const { name, quantity, price } = req.body;
    const user_id = req.user.user_id;
    const product_id = await getProductIdByName(name);

    const newSellOrder = await SellOrders.create({
      user_id,
      product_id,
      quantity,
      price,
      order_date: new Date(),
      status: "pending",
    });

    await matchBuyOrder(newSellOrder);

    res.status(201).json({ message: "Sell order created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBuyOrder = async (req, res) => {
  try {
    console.log("Inside createBuyOrder");
    const BuyOrders = require("../models/buy_orders");
    const { product_name, quantity, price } = req.body;
    const user_id = req.user.user_id;
    console.log("user_id", user_id, "name", product_name);
    const product_id = await getProductIdByName(product_name);

    const newBuyOrder = await BuyOrders.create({
      user_id,
      product_id,
      quantity,
      price,
      order_date: new Date(),
      status: "pending",
    });

    await matchSellOrder(newBuyOrder);

    res.status(201).json({ message: "Buy order created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function matchBuyOrder(sellOrder) {
  try {
    // Find all buy orders for the same product with a price greater than or equal to the sell order price
    const BuyOrders = require("../models/buy_orders");
    const buyOrders = await BuyOrders.findAll({
      where: {
        product_id: sellOrder.product_id,
        price: {
          [Op.gte]: sellOrder.price,
        },
        status: "pending",
      },
      order: [
        ["price", "DESC"],
        ["order_date", "ASC"],
      ],
    });

    for (const buyOrder of buyOrders) {
      if (sellOrder.quantity === 0) {
        break;
      }

      // Calculate the fulfilled quantity
      const fulfilledQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);

      // Update the buy order quantity
      await BuyOrders.update(
        {
          quantity: buyOrder.quantity - fulfilledQuantity,
          status:
            buyOrder.quantity - fulfilledQuantity === 0
              ? "completed"
              : "pending",
        },
        {
          where: {
            buy_order_id: buyOrder.buy_order_id,
          },
        }
      );

      // Update the sell order quantity
      sellOrder.quantity -= fulfilledQuantity;
      sellOrder.status = sellOrder.quantity === 0 ? "completed" : "pending";
      await sellOrder.save();

      // Create a new completed order entry
      await completedOrders.create({
        buy_order_id: buyOrder.buy_order_id,
        sell_order_id: sellOrder.sell_order_id,
        quantity: fulfilledQuantity,
        completion_date: new Date(),
      });
    }
  } catch (error) {
    console.error(`Error in matchBuyOrder: ${error.message}`);
  }
}

async function matchSellOrder(buyOrder) {
  try {
    // Find all sell orders for the same product with a price less than or equal to the buy order price
    const SellOrders = require("../models/sell_orders");
    const sellOrders = await SellOrders.findAll({
      where: {
        product_id: buyOrder.product_id,
        price: {
          [Op.lte]: buyOrder.price,
        },
        status: "pending",
      },
      order: [
        ["price", "ASC"],
        ["order_date", "ASC"],
      ],
    });

    for (const sellOrder of sellOrders) {
      if (buyOrder.quantity === 0) {
        break;
      }

      // Calculate the fulfilled quantity
      const fulfilledQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);

      // Update the sell order quantity
      await SellOrders.update(
        {
          quantity: sellOrder.quantity - fulfilledQuantity,
          status:
            sellOrder.quantity - fulfilledQuantity === 0
              ? "completed"
              : "pending",
        },
        {
          where: {
            sell_order_id: sellOrder.sell_order_id,
          },
        }
      );

      // Update the buy order quantity
      buyOrder.quantity -= fulfilledQuantity;
      buyOrder.status = buyOrder.quantity === 0 ? "completed" : "pending";
      await buyOrder.save();

      // Create a new completed order entry for each matched sell order
      await completedOrders.create({
        buy_order_id: buyOrder.buy_order_id,
        sell_order_id: sellOrder.sell_order_id,
        quantity: fulfilledQuantity, // Include the fulfilled quantity in the completed order entry
        completion_date: new Date(),
      });
    }
  } catch (error) {
    console.error(`Error in matchSellOrder: ${error.message}`);
  }
}

exports.getUserOrders = async (req, res) => {
  try {
    console.log("Inside getUserOrders");
    const user_id = req.user.user_id;
    console.log("user_id", user_id);

    const buyOrders = await BuyOrders.findAll({ where: { user_id } });
    const sellOrders = await SellOrders.findAll({ where: { user_id } });
    console.log("buyOrders", buyOrders);
    console.log("sellOrders", sellOrders);

    res.status(200).json({ buyOrders, sellOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMarketOrders = async (req, res) => {
  try {
    const BuyOrders = require("../models/buy_orders");
    const SellOrders = require("../models/sell_orders");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const buyOrders = await BuyOrders.findAll({ limit, offset });
    const sellOrders = await SellOrders.findAll({ limit, offset });
    console.log("buyOrders", buyOrders);
    console.log("sellOrders", sellOrders);

    res.status(200).json({ buyOrders, sellOrders });
  } catch (error) {
    console.error("Error fetching market orders", error);
    res.status(500).json({ message: "Error fetching market orders", error });
  }
};

exports.matchBuyOrder = matchBuyOrder;
exports.matchSellOrder = matchSellOrder;
