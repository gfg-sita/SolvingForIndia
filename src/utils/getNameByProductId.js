const getNameByProductId = async (id) => {
    try {
        const Products = require("../models/products");
        const product = await Products.findOne({ where: { product_id: id } });
        return product.name;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}

exports.getNameByProductId = getNameByProductId;