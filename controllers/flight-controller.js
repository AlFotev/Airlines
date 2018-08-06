const mongoose = require("mongoose");
const Flight = require("../models/Flight");
const domain = require("../config/config");
let page;
let end;
let start;
let arr;
let items = 6;

module.exports = {
    create: function (req, res, next) {
        Flight.create({
            origin: req.body.origin,
            destination: req.body.destination,
            departureTime: req.body.depTime,
            departureDate: req.body.depDate,
            image: "http://localhost:" + domain.development.port + "/" + req.file.path || "http://localhost:" + domain.production.port + "/" + req.file.path
        }).then(flight => {
            res.status(201).json({ "msg": "success" })
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({ "msg": "fail" });
            })
    },
    getAll: (req, res, next) => {
        let criteria = {};
        if (req.body.origin) {
            criteria = {
                origin: req.body.origin,
                destination: req.body.destination,
                departureDate: req.body.departureDate
            }
        }
        Flight.find(criteria)
            .sort({ departureDate: 1 })
            .then(data => {
                let length = data.length;
                page = Number(req.body.page);
                if (page == 1) {
                    start = 0;
                    end = items;
                } else {
                    end = page * items;
                    start = end - items;
                }
                arr = data.slice(start, end)
                res.status(201).json({ "msg": arr, "length": length });
            })
            .catch(err => {
                res.status(500).json({ "msg": err });
            })
    },
    search: function(req, res, next){
        let criteria = {
            origin: req.body.origin,
            destination: req.body.destination,
            departureDate: req.body.departureDate
        };
        Flight.find(criteria)
            .sort({ departureDate: 1 })
            .then(data => {
                let length = data.length;
                page = parseInt(req.body.page);
                if (page == 1) {
                    start = 0;
                    end = items;
                } else {
                    end = page * items;
                    start = end - items;
                }
                arr = data.slice(start, end)
                res.status(201).json({ "msg": arr });
            })
            .catch(err => {
                res.status(500).json({ "msg": err });
            })
    },
    getDest: function(req, res, next) {
        Flight.find({})
            .then(allFlights => {
                let data = [];
                allFlights.map((el) => {
                    if (data.indexOf(el.destination) < 0) {
                        data.push(el.destination);
                    }
                })
                res.status(201).json({ "msg": data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getOri: (req, res, next) => {
        Flight.find({})
            .then(allFlights => {
                let data = [];
                allFlights.map((el) => {
                    if (data.indexOf(el.origin) < 0) {
                        data.push(el.origin);
                    }
                })
                res.status(201).json({ "msg": data })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getDetails: (req, res, next) => {
        let id = req.params.id;
        Flight.findById(id)
            .then(flight => {
                res.status(201).json({ "flight": flight })
            })
            .catch(err => {
                console.log(err)
            })
    },
    editFlight: function(req, res, next){
        let id = req.params.id;
        Flight.deleteOne({ "_id": id })
            .then(success => {
                Flight.create({
                    origin: req.body.origin,
                    destination: req.body.destination,
                    departureTime: req.body.depTime,
                    departureDate: req.body.depDate,
                    image: "http://localhost:" + domain.development.port + "/" + req.file.path || "http://localhost:" + domain.production.port + "/" + req.file.path
                }).then(flight => {
                    res.status(201).json({ "msg": flight })
                })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ "msg": "fail" });
                    })
            })
            .catch(err => {
                console.log(err)
            })

    },
    deleteFlight: function(req, res, next){

    }
}