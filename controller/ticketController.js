const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {MongoClient} = require('mongodb')
const {z} = require('zod');
const Ticket = require('../models/ticket');
const { token, jwtPassword } = require('./userController');
const ticketSchema = z.object({
    passengerName:z.string(),
    trainNumber: z.string().min(5),
    source:z.string(),
    destination:z.string(),
    date:z.coerce.date() 
})

const   createTicket = async(req,res)=>{

  try{
    const result = ticketSchema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
            msg:"Error occured while creating ticket",
            errors: result.error.flatten().fieldErrors 
        })
    }
    const {passengerName,trainNumber,source,destination,date} = result.data;
    const ticket = new Ticket({
        ...result.data,
    })
    await ticket.save()
    return res.status(200).json({
        msg:"ticket create sucessfull",
        ticket
    })
}
catch(error){
    console.error("Ticket creation error: ", error); 
    return res.status(403).json({
        msg:"Some error occured"
    })
}

}


const getTickets = async(req,res)=>{
    try {
        const ticket = await Ticket.find() 
        return res.status(200).json(ticket);

    } catch (error) {
    return res.status(500).json({
      msg: "Error fetching tickets",
      error: error.message,
    })
}
}


const getAllTickets = async (req,res)=>{
try{

await getTickets(req,res)
}

catch(error){
    return res.status(404).json({
        msg:"ERROR OCCURED",
        error: error.message,

    })
}
}



const ticketById = async (req,res)=>{
    try {
        const ticketId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({ msg: "Invalid ticket ID format" });
          }

        const ticket = await Ticket.findById(ticketId)
        if(!ticket){
            return res.status(403).json({
                msg:"No ticket found"
            })
        }
        return res.status(200).json(ticket)
    } catch (error) {
       return res.status(500).json({ 
        msg: "Error fetching ticket by id",
        error: error.message,
    })
    }
}


const getTicketById= async(req,res)=>{
try{
    await ticketById(req,res)
}
catch(error){
    return res.status(404).json({
        msg:"ERROR OCCURED",
        error: error.message,
    })
}
}



const updateTicket= async (req,res)=>{
    try
    {
    
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id,
    {
        $set:{
            source: req.body.source,
            destination: req.body.destination
        }
    },{
        new: true  
    }
)
if(!updatedTicket){
    res.status(404).json({
        msg: "Ticket not found",

    })
}

res.status(500).json({
    msg:"TICKET UPDATED",
    ticket:updatedTicket
})
}
catch(error){
    res.status(404).json({
        msg:"Error occured",
        error:error.message
    })
}
}




const deleteTicket= async(req,res)=>{
try{
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id)
    if(!deletedTicket){
        return res.status(404).json({
            msg:"User not found",
        })
    }
    res.status(200).json({
        msg:"Ticket deleted"
    })
}
catch(error){
    return res.status(500).json({
        msg:"Error occured",
        error:error.message
    })
}
}

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket
}
