const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const UserDBService = require("../database/services/userService");

const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

const dbService = new UserDBService();

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body

        const user = await dbService.getUserByEmail(email)

        if (!user) {
            throw new AppError("Usuário não encontrado!", 401)
        }

        const checkPassword = await compare(password, user.password)

        if (!checkPassword) {
            throw new AppError("E-mail e/ou senha inválidos!", 401)
        }

        const authenticatedUser = { ...user.toObject(), password: undefined, __v: undefined }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({ user: authenticatedUser, token })
    }
}

module.exports = SessionsController;