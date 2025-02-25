const AppError = require("../utils/AppError");
const CatalogDBService = require("../database/services/catalogService");

const dbService = new CatalogDBService();

class UsersAdminController {
    async create(request, response) {
        const { user } = request.user

        const {
            name,
            category,
            ingredients,
            price,
            description
        } = request.body

        if (!user.isAdmin) {
            throw new AppError("Somente usuários administradores podem cadastrar um novo produto!", 401)
        }

        if (!name || !category || !ingredients || !price || !description) {
            throw new AppError("Todos os campos precisam ser preenchidos!")
        }

        const checkNameExists = await dbService.getProductByName(name)

        if (checkNameExists) {
            throw new AppError("Um produto com esse nome já foi cadastrado!")
        }

        await dbService.createProduct({
            name,
            category,
            ingredients,
            price,
            description
        })

        return response.status(201).json({ message: "Produto cadastrado com sucesso!" })
    }

    async update(request, response) {
        const { user } = request.user
        const { id } = request.query

        const {
            name,
            category,
            ingredients,
            price,
            description
        } = request.body

        if (!user.isAdmin) {
            throw new AppError("Somente usuários administradores podem atualizar um produto!", 401)
        }

        if (!name || !category || !ingredients || !price || !description) {
            throw new AppError("Todos os campos precisam ser preenchidos!")
        }

        const checkNameChange = await dbService.getProductByName(name)

        if (checkNameChange && checkNameChange._id.toString() !== id.toString()) {
            throw new AppError("Este nome já está cadastrado para outro produto!")
        }

        await dbService.updateProduct(id.toString(), {
            name,
            category,
            ingredients,
            price,
            description
        })

        return response.status(200).json({ message: "Produto alterado com sucesso!" })
    }

    async delete(request, response) {
        const { user } = request.user
        const { id } = request.query

        if (!user.isAdmin) {
            throw new AppError("Somente usuários administradores podem deletar um produto!", 401)
        }

        await dbService.deleteProduct(id)

        return response.status(200).json({ message: "Produto deletado com sucesso!" })
    }
}

module.exports = UsersAdminController;