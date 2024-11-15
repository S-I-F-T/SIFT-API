"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var gridfsStream = require("gridfs-stream");
var multer = require("multer");
var app = express();
var port = 3000;
var v1SiftApi = express.Router();
var v2SiftApi = express.Router();
var mongoURI = 'mongodb://localhost:27017/test';
var conn = mongoose.createConnection(mongoURI);
var gfs = null;
conn.once('open', function () {
    gfs = gridfsStream(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('Connection to MongoDB is successful!');
});
// Create a storage object with a given configuration
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
// Define a route
v1SiftApi.get('/', function (req, res) {
    res.send('VERSION 1 SIFT API!');
});
// Retrieve a zipped folder for the assignment associated with {key}
v1SiftApi.get('/assignment/:key', function (req, res) {
    res.send('Hello TypeScript with Express!');
});
// Add assignment information with the associated key
v1SiftApi.post('/assignment/:key', upload.single('file'), function (req, res) {
    if (!req.file || !gfs) {
        res.status(400).send('No file uploaded!');
        return;
    }
    var uploadStream = gfs.createWriteStream({
        filename: req.file.originalname,
        content_type: req.file.mimetype,
    });
    uploadStream.end(req.file.buffer);
    uploadStream.on('finish', function (file) {
        res.send("File uploaded successfully: ".concat(file.filename));
    });
    uploadStream.on('error', function (error) {
        res.status(500).send('Error uploading file!');
    });
});
v1SiftApi.put('/assignment/:key', function (req, res) {
    res.send('Hello TypeScript with Express!');
});
v1SiftApi.get('/time/Islamabad', function (req, res) {
    // Get the current time in Islamabad
    var date = new Date();
    var options = { timeZone: 'Asia/Karachi', hour12: false };
    var time = date.toLocaleTimeString('en-US', options);
    res.send("Current time in Islamabad: ".concat(time));
});
// Delete the assignment information associated with {key}
v1SiftApi.delete('/assignment/:key', function (req, res) {
    res.send('Hello TypeScript with Express!');
});
v2SiftApi.get('/', function (req, res) {
    res.send('VERSION 2 SIFT API!');
});
app.use('/v1', v1SiftApi);
app.use('/v2', v2SiftApi);
// Start the server
app.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
});
