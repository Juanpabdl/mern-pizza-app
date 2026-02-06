import express from "express";
import multer from "multer";
import myMenuController from "../controller/myMenuController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

//api/my/menu
router.get("/", (req, res) => {
    res.send("myMenuRoute works!");
});

router.post(
    "/",
    upload.single("imageFile"), 
    myMenuController.createMenuItem
);

export default router;