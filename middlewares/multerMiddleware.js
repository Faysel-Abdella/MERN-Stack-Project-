import multer from "multer";

const storage = multer.diskStorage({
  destination: (re, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (re, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
