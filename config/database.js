const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const User = require("../models/User");

module.exports = (config) => {
    mongoose.connect(config.dbPath, { useMongoClient: true });
            let db = mongoose.connection;
            db.once("open", (err) => {
                if (err) {
                    throw err;
                }
                User.seedAdminUser();
                console.log("MongoDB ready");
            })
            db.on("error", (err) => console.log("Database err: " + err));
}