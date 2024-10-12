const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("MONGO_URL");
        // console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB: ", err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
