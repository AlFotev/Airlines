const controllers = require("../controllers");
module.exports = (app) => {
app.get("/", controllers.home.index),
app.post("/login", controllers.user.loginPost),
app.post("/register", controllers.user.register)
}