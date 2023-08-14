const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const productController = require("../controllers/productController");
const commentController = require("../controllers/commentController");

router.get("/videos", videoController.getAllVideos);

router.get("/videos/:videoId", videoController.getVideoById);

router.get("/products", productController.getAllProducts);

router.get("/products/:productId", productController.getProductById);

router.get("/comments", commentController.getAllComments);

router.post("/submit-comment", commentController.addComment);

module.exports = router;
