const AppError = require("../utils/AppError");
const CatalogDBService = require("../database/services/catalogService");

const dbService = new CatalogDBService();

class CatalogController {
    async show(request, response) {
        const { id } = request.query

        const product = await dbService.getProductById(id.toString())

        return response.status(200).json({ product })
    }

    async index(request, response) {
        const products = await dbService.getAllProducts()

        return response.status(200).json({ products })
    }
}

module.exports = CatalogController;