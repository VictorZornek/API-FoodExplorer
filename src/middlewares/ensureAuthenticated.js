const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")
const UserDBService = require("../database/services/userService");

const dbService = new UserDBService();

async function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError("JWT Token não informado!", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret)

        const user = await dbService.getUserById(user_id)

        if (!user) {
            throw new AppError("Usuário não foi encontrado!")
        }

        request.user = { user: user }

        return next()

    } catch {
        throw new AppError("JWT Token inválido", 401)
    }
}


module.exports = ensureAuthenticated;