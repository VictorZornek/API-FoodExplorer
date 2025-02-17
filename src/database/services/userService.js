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

    async getAllUsers() {
        const users = await User.find()

        return users
    }

    async deleteUser(id) {
        await User.deleteOne({ _id: Types.ObjectId.createFromHexString(id) })
    }
}

module.exports = UserDBService;