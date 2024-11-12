import mongoose, { Connection } from 'mongoose';
import gridfsStream from 'gridfs-stream';
import { GridFSBucket } from 'mongodb';

let gfs: gridfsStream.Grid | null = null;
let gridFSBucket: GridFSBucket | null = null;

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/test";

const conn: Connection = mongoose.createConnection(mongoURI);

const TestSchema = new mongoose.Schema({name: String});
const TestModel = conn.model('Test', TestSchema);
const doc = new TestModel({name: 'Hello, MongoDB!'});

doc.save().then(() => {

    console.log('Saved!');

});

