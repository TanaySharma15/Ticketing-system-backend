const mongoose = require('mongoose')
const express = require('express')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    admin:Boolean 
})

const User = mongoose.model('User',userSchema);
module.exports = User
