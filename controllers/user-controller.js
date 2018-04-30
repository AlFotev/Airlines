const encryption = require('../util/encryption');
const User = require('../models/User');
module.exports = {
    loginPost: (req, res) => {
        let reqUser = req.body;
        User.findOne({ email: reqUser.email })
            .then(user => {
                if (!user.authenticate(reqUser.password)) {
                    res.send({ "msg": "wrong" })
                    return
                }
                req.logIn(user, (err, user) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.locals.currentUser = req.user;
                        res.send({ "msg": "success", });
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
                    firstName: userReq.firstName,
                    salt,
                    roles: []
                });
    
                req.logIn(user, (err, user) => {
                    if (err) {
                        res.send({"msg":"logfail"});
                    } else {
                        res.locals.currentUser = req.user;
                        res.send({"msg":"success"});
                    }
                });
            } catch (e) {

                res.send({ "msg": e });
            }
    }
}