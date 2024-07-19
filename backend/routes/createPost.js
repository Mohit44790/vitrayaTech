const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { route } = require("./auth");
const POST = mongoose.model("POST");

// Route
router.get("/allposts", requireLogin, (req, res) => {
  POST.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router.post("/createPost", requireLogin, (req, res) => {
  const { body, photo, mediaType } = req.body; // Use 'photo' instead of 'pic'

  if (!body || !photo || !mediaType) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  const post = new POST({
    body,
    photo, // Use 'photo' instead of 'pic'
    mediaType,

    postedBy: req.user,
  });

  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Failed to create a post" });
    });
});

router.get("/myposts", requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((myposts) => {
      res.json(myposts);
    });
});

module.exports = router;
