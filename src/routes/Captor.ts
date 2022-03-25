import Captor from "@/controllers/Captor";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", Captor.get);
router.get("/:id", Captor.getById);
router.post("/", Captor.post);
router.patch("/:id", Captor.patch);
router.delete("/:id", Captor.delete);

export default router;
