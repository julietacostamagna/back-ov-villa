const express = require("express");
const router = express.Router();
const { migrationUser } = require("../controllers/User.controller");
// const { migrator1Up } = require('../controllers/migrations.controller')
const { login, testConect, register, newQuery } = require("../controllers/Auth.controller");
const { verifyToken } = require("../middleware/Auth.middleware");
const { customerServices, customerConsumption } = require("../controllers/Procoop.controller");
const { getInvoice } = require("../controllers/Payment.controller");

// RUTAS PARA AUHT

router.post("/login", login);
router.post("/register", register);
router.get("/users", migrationUser);

//RUTAS DE CONSULTAS A PROCOOP
router.get("/getService", customerServices);
router.get("/getConsumo", customerConsumption);

//RUTAS DE PAGOS
router.get("/facturas", getInvoice);

// router.get('/pruebaMigration', migrator1Up)
router.get("/newQuery", newQuery);

router.get("/testConect", testConect);

module.exports = router;
