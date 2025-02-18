const { Types } = require("mongoose");
const Catalog = require("../models/catalog");

class CatalogDBService {
    async getProductByName(name) {
        const product = await Catalog.findOne({ name: name })

        return product
    }

    async createProduct(product_data) {
        const product = new Catalog(product_data)

        await product.save()
    }

    async getAllProducts() {
        const products = await Catalog.find()

        return products
    }

}

module.exports = CatalogDBService;