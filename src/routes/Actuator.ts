import Actuator from "@/controllers/Actuator";
import express from "express";
import { CheckAuth } from "@/middlewares/authentification";
const router = express.Router();
var app = express();

//router.use(CheckAuth);
/* GET home page. */
router.get("/", Actuator.get, app.use(CheckAuth));
router.get("/:id", Actuator.getById, app.use(CheckAuth));
router.post("/", Actuator.post, app.use(CheckAuth));
router.patch("/:id", Actuator.patch, app.use(CheckAuth));
router.delete("/:id", Actuator.delete, app.use(CheckAuth));

export default router;
