require('dotenv').config()
const http = require('http')
const path = require('path')
//import express app
const express = require('express')
const app = express()
//load events module
const cors = require('cors')
const PORT = process.env.PORT || 3000
// const connectDB = require('./config/dbConn')
// const mongoose = require('mongoose')

/* middleware */

//database
connectDB();

//setup CORS
app.use(cors())

//decode form data in url
app.use(express.urlencoded({extended:false}))

//json support
app.use(express.json())

//static files support
app.use(express.static(path.join(__dirname,"/public")))


/* routes */

app.use("/", require("./routes/homePage"))

//any routing that did not meet any other route
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
    res.sendFile(path.join(__dirname,"views","404.html"))
    }
    else if (req.accepts('json')){
        res.json({error: "404 not found"})
    }
    else{
        res.type('txt').send("404 not found")
    }
})

// //connect to mongoDB instance and then begin listening on port for requests
// mongoose.connection.once('open', ()=>{
//     console.log('Connected to DB');
//     app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))
// })
// //log any errors to console
// mongoose.connection.on('error', (err)=>{
//     console.log(err);
// })

