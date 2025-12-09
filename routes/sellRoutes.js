const express = require("express");
const router = express.Router();
const bookController = require("../controller/sellController");
const multer = require("multer");

// Image Upload Config
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// USER APIs
router.post("/addBook", bookController.addBook);
router.post("/uploadImage", upload.single("image"), bookController.uploadImage);

// ADMIN APIs
router.patch("/admin/approve", bookController.adminApprove);
router.patch("/admin/reject", bookController.adminReject);

// USER Offer Decision APIs
router.patch("/user/accept", bookController.userAccept);
router.patch("/user/reject", bookController.userReject);

router.get("/user/:userId", bookController.getBooksByUser);

module.exports = router;