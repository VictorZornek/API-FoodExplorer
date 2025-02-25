const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const usersAdminRouter = require("./usersAdmin.routes");
const catalogRouter = require("./catalog.routes")

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/admin", usersAdminRouter);
routes.use("/catalog", catalogRouter);

module.exports = routes