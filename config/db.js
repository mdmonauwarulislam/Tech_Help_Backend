const mongoose = require('mongoose');

// Connect to MongoDB
const dbConnection  = (url) => {
    mongoose.connect(url);
}

const db = mongoose.connection;

db.on('error', (error) => {
    console.error("MongoDB connection error: ", error);
})

db.once("open", () => {
    console.log("MongoDB connected successfully!");
});

module.exports = {dbConnection};