import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid email format",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      validate: {
        validator: function (value) {
          return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(
            value,
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 6 characters long",
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
