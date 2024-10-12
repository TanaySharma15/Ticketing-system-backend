
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
process.env.NODE_ENV = 'test';

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

connectDB(); 

app.use('/api/auth', authRoutes); 
app.use('/api/ticket',ticketRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



module.exports = app;
