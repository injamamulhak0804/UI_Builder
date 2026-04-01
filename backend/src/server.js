import express from "express";
import dotenv from "dotenv";
import zentoraRoutes from "./routes/zentora.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(express.json());


//Routes 
app.use("/api/v1", zentoraRoutes);

app.get("/", (req, res) => {
 res.send("Please use /api/v1 for endpoints");
})

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});