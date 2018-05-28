const mongoose = require("mongoose");
const Flight = require("../models/Flight");

module.exports = {
    flightImage: function (req, res, next) {
            Flight.create({
                origin:req.body.origin ,
                destination:req.body.destination,
                departureTime:req.body.depTime,
                departureDate:req.body.depDate,
                image:req.file.path
            }).then(flight=>{
                res.status(201).json({ "msg": "success" })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({ "msg": "fail" });
            })
    }
}