const { Types } = require("mongoose");
const User = require("../models/user");

class UserDBService {
    async getUserByEmail(email) {
        const user = await User.findOne({ email: email })

        return user
    }

    async createUser(user_data) {
        const user = new User(user_data)

        await user.save()
    }
}

module.exports = UserDBService;