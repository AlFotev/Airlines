const controllers = require("../controllers");
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = {
            "image/jpeg": ".jpg",
            "image/png": ".png"
        }
        cb(null, file.fieldname + '-' + new Date().toISOString().replace(/:/g, '-') + ext[file.mimetype])
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpeg") {
        cb(null, true)
    }
    else {
        cb(new Error("File not supported"), false)
    }
}
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter

});

module.exports = (app) => {
    app.get("/", controllers.home.index),
        app.post("/login", controllers.user.loginPost),
        app.post("/register", controllers.user.register),
        app.post("/logout", controllers.user.logout),
        app.post("/upload", upload.single("image"), controllers.uploader.flightImage)
}