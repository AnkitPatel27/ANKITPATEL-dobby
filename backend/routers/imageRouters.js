const { Router, query } = require("express");
const mongoose = require("mongoose");
const router = Router();
const { requireAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const Image = require("../models/userImage");

//MULTER STORAGE
const Storage = multer.memoryStorage();

const upload = multer({
  storage: Storage,
}).single("file");

router.post("/uploadImage", requireAuth, async (req, res) => {
  // console.log(req.cookies,req.userId)
  const p = upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("req : ",req.file);
      const newImage = new Image({
        user: new mongoose.Types.ObjectId(req.userId.id),
        name: req.file.originalname,
        image: {
          data: req.file.buffer,
          contentType: "image/png",
        },
      });
      // console.log("created *************************\n");
      const resp = await newImage.save();
      // console.log("SAve *************************\n");
      res.status(201).send("Done");
    }
  });
});

router.get("/image/:id", requireAuth, async (req, res) => {
  const imageId = req.params.id;
  const userId = req.userId.id;
  await Image.findById({ user: userId, _id: imageId }, (err, image1) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!image1) {
      return res.status(404).send("Image not found");
    }
    const imageData = image1.image.data;
    res.set("Content-Type", "image/jpeg");
    return res.send(imageData);
  });
});

router.get("/imageData", requireAuth, async (req, res) => {
  try {
    const userid = req.userId.id;
    const result = await Image.find({ user: userid }, { _id: 1, name: 1 });
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json([]);
  }
});

router.get("/imageSearch/:searchTerm", requireAuth, async (req, res) => {
  try {
    const userid = req.userId.id;
    const searchTerm = req.params.searchTerm;
    const result = await Image.find(
      { user: userid, name: new RegExp(searchTerm, "i") },
      { _id: 1, name: 1 }
    );
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json([]);
  }
});

module.exports = router;
