const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

// configure environment variables in .env
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json()) // parse json

// mongodb configurations
// const uri = process.env.ATLAS_URI;

// local uri
const uri = "mongodb://mongo:27017/tasks-db";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Successfully connected to MongoDB database')
})

// routers
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

