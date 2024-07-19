const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requireLogin = require("../middlewares/requireLogin");

// to get user profile
router.get("/user/:id", (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      POST.find({ postedBy: req.params.id })
        .populate("postedBy", "_id")
        .exec((err, post) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.status(200).json({ user, post });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

// to upload profile pic
router.put("/uploadProfilePic", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    {
      $set: { Photo: req.body.pic },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: er });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
