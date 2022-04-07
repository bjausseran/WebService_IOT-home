import User from "@/controllers/User";
import express from "express";
import { CheckAuth } from "@/middlewares/authentification";
const router = express.Router();
const app = express();

router.use(CheckAuth)
/* GET home page. */
router.get("/", User.get, app.use(CheckAuth));
router.get("/login", User.log);
router.get("/:id", User.getById, app.use(CheckAuth));
router.post("/", User.post);
router.patch("/:id", User.patch, app.use(CheckAuth));
router.delete("/:id", User.delete, app.use(CheckAuth));

export default router;
