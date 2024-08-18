import express from "express";
import multer from "multer";
import asyncHandler from "../middleware/asynchandler.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let fn = `${Date.now()}-${file.originalname}`;
    cb(null, fn);
  },
});

const fileFilter = (req, file, cb) => {
  let filePattern = /\.(jpg|jpeg|png|webp)$/;
  if (!file.originalname.match(filePattern)) {
    cb("Only image file supported", false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post(
  "/upload",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    res.send({
        message: "Image Uploaded!",
        filepath: req.file.path,
    })
  })
);
export default router;

//notes:
// multer को काम भनेको multimedia(photo, video, audio, pdf, etc) upload गर्ने काम हो ।

//multer.diskStorage भनेको server मा storage गर्नु हो ।
//destination कहाँ store गर्ने,
//filename नाम के राख्ने,
//req भनेको हाम्रो त्यही req object नै भइहाल्यो,
//file भनेको file को shorten information,
//cd भनेको call back
//uploads भन्ने फाइलमा materials upload गर्ने काम गरिदिनेभयो,
//null भनेको error null छ भन्न खोजेको हो, cb को पहिलो parameter error related छ, second parameter ले  uploads भन्ने folder बनाइदिन्छ,

//fileFilter ले तोकिएको मापदण्डको पठाएको छैन भने cb को error मा "Only image file supported" जान्छ, हैन भने cb मा null जान्छ।

//multer लाई initialize गर्नलाई multer मा storage र fileFilter हालिदिएको हो ,

////router.post को image भनेको key हो, image को हकमा image key नै राख्नु पर्छ,
