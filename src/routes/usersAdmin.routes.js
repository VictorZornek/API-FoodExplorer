const { Router } = require("express")

const UsersAdminController = require("../controllers/UsersAdminController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersAdminRoutes = Router();

const usersAdminController = new UsersAdminController();

usersAdminRoutes.post("/", ensureAuthenticated, usersAdminController.create);
usersAdminRoutes.put("/", ensureAuthenticated, usersAdminController.update);
usersAdminRoutes.delete("/", ensureAuthenticated, usersAdminController.delete);

module.exports = usersAdminRoutes;