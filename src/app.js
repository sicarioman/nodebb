const express = require('express');
require('dotenv').config();
const DatabaseHelper = require('./helpers/database');
const mongodbConfig = require('./config/mongodb');
const cookieParser = require('cookie-parser');

const app = express();

// Express Middlwares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Route APIs
app.use('/', require('./api/router'));

// Internal Error Handler (Development)
if(app.get('env') == 'development') {
    app.use((err, req, res, next) => {
        const status = err.statusCode || 500;
        const message = err.message;
        const errors = err.errors;
        return res.status(status).json({message: message, debug: err, errors: errors});
    });
}

// Production Error Handler
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message;
    const errors = err.errors;
    return res.status(status).json({message: message});
});

DatabaseHelper.connect(mongodbConfig.MONGODB_URI, error => {
    if(error) {
        console.log(error);
    }
    
    app.listen(process.env.PORT || 3000, () => {
        console.log('Running on Port:', process.env.PORT || 3000);
    });
});
