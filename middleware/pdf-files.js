const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = file.mimetype === 'application/pdf' ? true : false;
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "cvs");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = 'pdf';
      cb(null, name + "-" + Date.now() + "." + ext);
    }
});
  
module.exports = multer({ storage: storage }).single("cv");
  