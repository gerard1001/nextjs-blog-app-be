const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg" && ext !== ".mp4") {
      return cb(res.status(400).end("unsupported format"), false);
    }
    cb(null, true);
  },
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 2 * 1024 * 1024,
  // },
});

module.exports = { upload };
