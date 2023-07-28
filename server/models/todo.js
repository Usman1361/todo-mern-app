import mongoose, { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    time: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

export const todo = model("todo", todoSchema);
