const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    photo: String, // Store the URL of the image

    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "USER" },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "USER",
    },
  },
  { timestamps: true }
);

mongoose.model("POST", postSchema);
