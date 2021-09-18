var multer = require("multer");

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname );
  },
});

//const upload = multer({ storage: storage, fileFilter: multerFilter });
const upload = multer({ storage: storage});

module.exports = upload;
