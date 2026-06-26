const express = require('express');
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const app = express();
const URL = require("./models/url")

const PORT = 8001;

app.use(express.json())

app.use("/url", urlRoute)

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=> console.log("MongoDB Connected"))

app.listen(PORT,()=>console.log("Server Started at Port: ", PORT))