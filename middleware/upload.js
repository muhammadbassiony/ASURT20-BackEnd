const multer = require("multer");
const fs = require("fs");

module.exports = (folders = { main: "", sub: "" }, single = true, fieldName = "file") => {
    const mainFolder = folders.main || "images";
    const subFolder = folders.sub || "";

    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('UPLOAD MIDDLEWARE DEST HERE ::');
            let dir = `${mainFolder}`;
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            dir =`${mainFolder}/${subFolder}`
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            return cb(null, dir);
        },
        filename: (req, file, cb) => {
            const fileName = `${new Date().getTime()}_${file.originalname}`;
            console.log('UPLOAD MIDDLEWARE FILENAME ::', fileName);
            cb(null, fileName);
        },
    });
    const fileFilter = (req, file, cb) => {
        switch (file.mimetype) {
            case "image/jpeg":
            case "image/jpg":
            case "image/png":
                cb(null, true);
                break;
            default:
                cb(null, false);
                break;
        }
    };
    const upload = multer({ storage: storage, fileFilter: fileFilter });
    return single ? upload.single(fieldName) : upload.any();
};
