const mongoose = require('mongoose')
const express = require('express')

const ticketSchema = new mongoose.Schema({
    passengerName:String,
    trainNumber: String,
    source:String,
    destination:String,
    date:Number 
})
// const ticketSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         enum: ['open', 'in-progress', 'closed'],
//         default: 'open',
//     },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Reference to the User model
//         required: true,
//     },
//     assignedTo: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Reference to the User model
//     },
// }, {
//     timestamps: true, // Automatically add createdAt and updatedAt fields
// });

const Ticket = mongoose.model('Ticket',ticketSchema);
module.exports = Ticket
