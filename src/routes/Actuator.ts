import Actuator from "@/controllers/Actuator";
import express from "express";
import { CheckAuth } from "@/middlewares/authentification";
const router = express.Router();
var app = express();

//router.use(CheckAuth);
/* GET home page. */
router.get("/", CheckAuth, Actuator.get);
router.get("/:id", CheckAuth, Actuator.getById);
router.post("/", CheckAuth, Actuator.post);
router.patch("/:id", CheckAuth, Actuator.patch);
router.delete("/:id", CheckAuth, Actuator.delete);

export default router;
