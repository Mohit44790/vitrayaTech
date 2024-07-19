const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Photo: {
    type: String,
    // This field can store the URL of the user's profile picture.
  },

  // Additional fields for user profile

  phone: {
    type: String,
  },
});

mongoose.model("USER", userSchema);
