import Captor from "@/controllers/Captor";
import express from "express";
import { CheckAuth } from "@/middlewares/authentification";
const router = express.Router();
var app = express();

/* GET home page. */
router.get("/", CheckAuth, Captor.get);
router.get("/:id", CheckAuth, Captor.getById);
router.post("/", CheckAuth, Captor.post);
router.patch("/:id", CheckAuth, Captor.patch);
router.delete("/:id", CheckAuth, Captor.delete);

export default router;
