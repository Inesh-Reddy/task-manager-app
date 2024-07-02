const express = require("express");
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require("./db/dbconnect");
require('dotenv').config();

const port = 3000;
const z = require('zod');
const notFound = require("./middlewares/non-existing-routes");
const errorHandler = require("./middlewares/custom-error-handler");

app.use(express.static('./public'))
app.use(express.json());

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    console.log("connecting to DB...");
    await connectDB(process.env.MONGODB_URL);
    console.log("connect to DB");
    app.listen(port, ()=>{
        console.log(`Server is listening on port :${port}...`)
    })
}

start();
