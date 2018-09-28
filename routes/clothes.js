const express = require("express");
const router  = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const ClothesController = require('../controllers/clothes');
const checkAuth = require('../middleware/check-auth');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
   filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", ClothesController.clothes_get_all);

router.post("/", checkAuth, upload.single('image'), ClothesController.clothes_create_clothes);

router.get("/:clothesId", ClothesController.clothes_get_clothes);

router.patch("/:clothesId", checkAuth, ClothesController.clothes_get_clothes);

router.delete("/:clothesId", checkAuth, ClothesController.clothes_get_clothes);

module.exports = router;
