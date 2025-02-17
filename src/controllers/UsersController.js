const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UsersController {
    async create(request, response) {
        const { name, email, password, isAdmin } = request.body

        if (!name || !email || !password) {
            throw new AppError("Todos os campos precisam ser preenchidos!")
        }
    }
}

module.exports = UsersController;