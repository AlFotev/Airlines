const encryption = require('../util/encryption');
const User = require('../models/User');
let name = '';
let access = [];
module.exports = {
    loginPost: (req, res) => {
        let reqUser = req.body;
        console.log(reqUser)
        User.findOne({ email: reqUser.email })
            .then(user => {
                if (!user.authenticate(reqUser.password)) {
                    res.send({ "msg": "wrong" })
                    return
                }
                name = user.name;
                access = user.roles;
                req.logIn(user, (err, user) => {
                    if (err) {
                        res.send({ "msg": "wrong" })
                    } else {
                        res.send({
                            "msg": "success",
                            "name": name,
                            "access":access
                        });
                    }
                })

            })
            .catch(error => {
                res.send({ "msg": "wrong" })
            })
    },
    register: async (req, res) => {
        const userReq = req.body;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, userReq.password);
        try {
            const user = await User.create({
                email: userReq.email,
                hashedPass: hashedPass,
                name: userReq.name,
                salt,
                roles: []
            });
            name = user.name;
            req.logIn(user, (err, user) => {
                if (err) {
                    res.send({ "msg": "logfail" });
                } else {

                    res.send({
                        "msg": "success",
                        "name": name
                    });
                }
            });
        } catch (e) {
            res.send({ "msg": "creationFail" });
        }
    },
    logout: (req, res) => {
        req.logout();
    }
}