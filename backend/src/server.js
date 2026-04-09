import express from "express";
import dotenv from "dotenv";
import zentoraRoutes from "./routes/zentora.routes.js";
import { connectDB } from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//Routes
app.use("/api/v1", zentoraRoutes);

app.get("/", (req, res) => {
  res.send("Please use /api/v1 for endpoints");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
