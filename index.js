const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
dotenv.config();

const authRoutes  = require('./routes/authRoutes');

// Connect to MongoDB
const {dbConnection} = require('./config/db');
const {PORT, MONGO_URI} = process.env;

dbConnection(MONGO_URI);


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    preflightContinue: false,
    optionsSuccessStatus: 201,
    credentials: true
}));

// Routes
app.use('/api', authRoutes);

const port = PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
