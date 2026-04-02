import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isLength(value, { min: 2 });
        },
        message: "Name must be at least 2 characters",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid email format",
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
