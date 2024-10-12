const mongoose = require('mongoose')
const express = require('express')

const ticketSchema = new mongoose.Schema({
    passengerName:String,
    trainNumber: String,
    source:String,
    destination:String,
    date:Number 
})
const Ticket = mongoose.model('Ticket',ticketSchema);
module.exports = Ticket
