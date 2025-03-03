const mongoose = require("mongoose");

const AppuserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["owner", "sitter", "admin"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", AppuserSchema);
