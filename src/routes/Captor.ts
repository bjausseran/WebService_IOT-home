import Captor from "@/controllers/Captor";
import express from "express";
import { CheckAuth } from "@/middlewares/authentification";
const router = express.Router();
var app = express();

/* GET home page. */
router.get("/", Captor.get, app.use(CheckAuth));
router.get("/:id", Captor.getById, app.use(CheckAuth));
router.post("/", Captor.post, app.use(CheckAuth));
router.patch("/:id", Captor.patch, app.use(CheckAuth));
router.delete("/:id", Captor.delete, app.use(CheckAuth));

export default router;
