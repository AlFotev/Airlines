const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    price: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    number:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    flightId:{
        type: mongoose.Schema.Types.String,
        required: true
    },destination:{
        type: mongoose.Schema.Types.String,
        required: true
    },origin:{
        type: mongoose.Schema.Types.String,
        required: true
    },departureDate:{
        type: mongoose.Schema.Types.String,
        required: true
    },departureTime:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    image:{
        type: mongoose.Schema.Types.String,
        required: true
    }
});

const Ticket = mongoose.model("Ticket",ticketSchema);

module.exports = Ticket;