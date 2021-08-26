import express = require("express");
import CalcController from "../controllers/calc.controller";
const router = express.Router();

/* POST calculation. */
router.post("", CalcController.calc);

export default module.exports = router;
