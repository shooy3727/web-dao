const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const uploadDir = path.join(
  __dirname,
  "../public/uploads/profiles"
);

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ==============================
// MULTER
// ==============================

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ được upload JPG, PNG hoặc WEBP."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024
  }
});

// ==============================
// CONVERT → WEBP
// ==============================

async function convertToWebp(req, res, next) {

  try {

    if (!req.files || req.files.length === 0) {
      return next();
    }

    for (const file of req.files) {

      const filename =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        ".webp";

      const outputPath = path.join(
        uploadDir,
        filename
      );

      await sharp(file.buffer)
        .resize({
            width: 175,
            height: 280,
            fit: "cover",
            position: "centre"
        })
        .webp({
          quality: 85
        })
        .toFile(outputPath);

      // Cập nhật thông tin file
      file.filename = filename;
      file.path = outputPath;
      file.mimetype = "image/webp";
    }

    next();

  } catch (error) {

    console.error("IMAGE CONVERT ERROR:", error);

    return res.status(400).json({
      success: false,
      message: "Không thể xử lý hình ảnh."
    });
  }
}

module.exports = {
  upload,
  convertToWebp
};