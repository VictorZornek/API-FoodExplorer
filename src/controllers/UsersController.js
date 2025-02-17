const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");
const UserDBService = require("../database/services/userService")

const dbService = new UserDBService()

class UsersController {
    async create(request, response) {
        const { name, email, password, isAdmin } = request.body

        if (!name || !email || !password) {
            throw new AppError("Todos os campos precisam ser preenchidos!")
        }

        const checkEmailExists = await dbService.getUserByEmail(email)

        if (checkEmailExists) {
            throw new AppError("Esse e-mail já está cadastrado para outro usuário!")
        }

        const hashedPassword = await hash(password, 8)

        await dbService.createUser({
            name,
            email,
            password: hashedPassword,
            isAdmin
        })

        return response.status(201).json({ message: "Usuário criado com sucesso!" })
    }

    async index(request, response) {
        const users = await dbService.getAllUsers()

        return response.status(200).json(users)
    }
}

module.exports = UsersController;