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
        app.post("/login", controllers.user.loginPost),
        app.post("/register", controllers.user.register),
        app.post("/logout", controllers.user.logout),
        app.post("/upload", upload.single("image"), controllers.flights.create),
        app.post("/flights",controllers.flights.getAll);
        app.post("/flights/search",controllers.flights.search);
        app.get("/flights/dest",controllers.flights.getDest);
        app.get("/flights/ori",controllers.flights.getOri);
        app.get("/details/:id",controllers.flights.getDetails);
        app.get("/tickets/:id",controllers.tickets.getTickets);
        app.put("/edit/:id", upload.single("image"), controllers.flights.editFlight);
        app.post("/details/:id",controllers.tickets.create);
        app.post("/shop/:id",controllers.tickets.buy);
        app.get("/shop/:id",controllers.tickets.getBoughtTickets);
}