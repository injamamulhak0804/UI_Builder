import express from "express";
import {
  getZentora,
  createZentora,
} from "../controllers/zentora.controller.js";

const router = express.Router();

// GET
router.get("/user/signin", getZentora);

// POST
router.post("/user/signup", createZentora);

export default router;
