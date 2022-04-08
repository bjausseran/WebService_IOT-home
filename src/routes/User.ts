import User from "@/controllers/User";
import express from "express";
import { CheckAuth } from "@/middlewares/authentification";
const router = express.Router();


/* GET home page. */
router.get("/", CheckAuth,User.get);
router.post("/login", User.log);
router.get("/:id", CheckAuth, User.getById);
router.post("/", User.post);
router.patch("/:id", CheckAuth, User.patch);
router.delete("/:id", CheckAuth, User.delete);

export default router;
