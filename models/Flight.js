const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    origin: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    destination: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    departureDate: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    departureTime: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    public: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
});

const Flight = mongoose.model("Flight",flightSchema);

module.exports = Flight;


