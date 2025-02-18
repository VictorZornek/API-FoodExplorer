const { Router } = require("express")

const UsersController = require("../controllers/UsersController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", usersController.index);
usersRoutes.get("/profile", ensureAuthenticated, usersController.show);
usersRoutes.delete("/", ensureAuthenticated, usersController.delete);

module.exports = usersRoutes;