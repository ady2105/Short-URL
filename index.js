const express = require('express');
const path = require('path')
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const app = express();
const URL = require("./models/url")

const PORT = 8001;

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use("/url", urlRoute)
app.use('/', staticRoute)


connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=> console.log("MongoDB Connected"))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.listen(PORT,()=>console.log("Server Started at Port: ", PORT))