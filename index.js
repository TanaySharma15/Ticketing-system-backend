// const express = require('express');
// require('dotenv').config()
// const mongoose = require('mongoose')

// const app = express();
// app.use(express.json());
// const PORT = process.env.PORT;


// mongoose.connect(process.env.MONGO_URL).then(()=>{
//     console.log("Connected to mongodb");
// }).catch((err)=>{
//     console.log("error : "+err);
// })



// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`)
// })
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db'); // Adjust the path if necessary
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
process.env.NODE_ENV = 'test';

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

connectDB(); // Call the function to connect to MongoDB

app.use('/api/auth', authRoutes); // Adjust the path as needed
app.use('/api/ticket',ticketRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



module.exports = app;
