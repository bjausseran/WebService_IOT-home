import Index from "@/controllers/Index";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", Index.get);
router.get("/hahah", Index.get);

export default router;
