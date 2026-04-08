import express from "express";
import {
  getZentora,
  createZentora,
} from "../controllers/zentora.controller.js";

const router = express.Router();

// POST
router.post("/user/signin", getZentora);

// POST
router.post("/user/signup", createZentora);

export default router;
