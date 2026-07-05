const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path')
const { connectToMongoDB } = require('./connect')

const app = express();
const URL = require("./models/url")

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user');
const {restrictToLoggedinUserOnly, checkAuth,} = require('./middlewares/auth');

const PORT = 8001;

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())

app.use("/url", restrictToLoggedinUserOnly, urlRoute)
app.use("/user", userRoute)
app.use('/', checkAuth, staticRoute)


connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=> console.log("MongoDB Connected"))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.listen(PORT,()=>console.log("Server Started at Port: ", PORT))