const express = require("express");
const router = express.Router();

const { addVideo, getVideos } = require("../controllers/videoController");
const auth = require("../middleware/auth");

// ➕ Add (Admin only)
router.post("/add", auth, addVideo);

// 👀 Get (Public)
router.get("/", getVideos);

module.exports = router;