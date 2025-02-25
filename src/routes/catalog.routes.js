const { Router } = require("express")

const CatalogController = require("../controllers/CatalogController");

const catalogRoutes = Router();

const catalogController = new CatalogController();

catalogRoutes.get("/product", catalogController.show);
catalogRoutes.get("/", catalogController.index);

module.exports = catalogRoutes;