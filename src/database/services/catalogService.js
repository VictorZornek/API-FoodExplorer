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

    async updateProduct(id, product_data) {
        await Catalog.updateOne(
            { _id: Types.ObjectId.createFromHexString(id) },
            { $set: product_data }
        )
    }

    async deleteProduct(id) {
        await Catalog.deleteOne({ _id: Types.ObjectId.createFromHexString(id) })
    }

}

module.exports = CatalogDBService;