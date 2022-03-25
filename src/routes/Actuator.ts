import Actuator from "@/controllers/Actuator";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", Actuator.get);
router.get("/:id", Actuator.getById);
router.post("/", Actuator.post);
router.patch("/:id", Actuator.patch);
router.delete("/:id", Actuator.delete);

export default router;
