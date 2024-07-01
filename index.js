const express = require("express");
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require("./db/dbconnect");
require('dotenv').config();
const port = 3000;
const z = require('zod');

app.use(express.json());

app.use('/api/v1/tasks', tasks);

const start = async () => {
    console.log("connecting to DB...");
    await connectDB(process.env.MONGODB_URL);
    console.log("connect to DB");
    app.listen(port, ()=>{
        console.log(`Server is listening on port :${port}...`)
    })
}

start();
