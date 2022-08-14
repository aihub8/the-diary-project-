const { Schema, Mongoose, default: mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const shortId = require("./type/short-id");

const Diary = new mongoose.Schema(
  {
    shortId,
    user_id: String,
    email: { type: String, required: true, lowercase: true },
    author: String,
    content: String,
    emotion: Number,
    title: String,
    createdDate: String,
    updatedDate: String,
    view_cnt: Number,
    tag1: String,
    tag2: String,
    tag3: String,
    img_url: String,
    month: String
  },
  { timestamps: { createdAt: "created_at" } }
);
Diary.plugin(AutoIncrement, { inc_field: "seq" });
module.exports = Diary;
