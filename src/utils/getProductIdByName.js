const getProductIdByName = async (name) => {
    try {
        const Products = require("../models/products");
        const product = await Products.findOne({ where: { name } });
        return product.product_id;  
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
};

exports.getProductIdByName = getProductIdByName;