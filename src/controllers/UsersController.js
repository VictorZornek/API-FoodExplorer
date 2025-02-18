const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");
const UserDBService = require("../database/services/userService");

const dbService = new UserDBService();

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

    async update(request, response) {
        const { user } = request.user
        const { name, email, newPassword, oldPassword } = request.body

        if (!user) {
            throw new AppError("Usuário não foi encontrado!")
        }

        const checkEmailChange = await dbService.getUserByEmail(email)

        if (checkEmailChange && checkEmailChange._id.toString() !== user._id.toString()) {
            throw new AppError("Este e-mail já está cadastrado para outro usuário!")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if (newPassword && !oldPassword) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha!")
        }

        if (newPassword && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password)

            if (!checkOldPassword) {
                throw new AppError("As senhas não coincidem")
            }

            user.password = await hash(newPassword, 8)
        }

        await dbService.updateUser(user._id.toString(), {
            name: user.name,
            email: user.email,
            password: user.password
        })

        return response.status(200).json({ message: "Usuário alterado com sucesso!", user: { ...user.toObject(), password: undefined, __v: undefined } })
    }

    async delete(request, response) {
        const { user } = request.user

        await dbService.deleteUser(user._id)

        return response.status(200).json({ message: "Usuário deletado com sucesso!" })
    }

    async show(request, response) {
        const { user } = request.user

        return response.status(200).json({ user })
    }

    async index(request, response) {
        const users = await dbService.getAllUsers()

        return response.status(200).json(users)
    }
}

module.exports = UsersController;