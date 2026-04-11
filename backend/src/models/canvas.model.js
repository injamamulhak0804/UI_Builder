import mongoose from "mongoose";

const canvasSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rectangles: Array,
    images: Array,
    color: String,
  },
  { timestamps: true },
);

export default mongoose.model("Canvas", canvasSchema);
