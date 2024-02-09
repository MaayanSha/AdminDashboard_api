require('dotenv').config()
const http = require('http')
const path = require('path')
//import express app
const express = require('express')
const app = express()
//load events module
const cors = require('cors')
const PORT = process.env.PORT || 3000
const {initDomainNames} = require('./controllers/domainNames')

/* middleware */

//database
//add domain names to hashmap
initDomainNames();

//setup CORS
app.use(cors())

//decode form data in url
app.use(express.urlencoded({extended:false}))

//json support
app.use(express.json())

//static files support
app.use(express.static(path.join(__dirname,"/public")))


/* routes */

app.use("/", require("./routes/api/domains"))

//any routing that did not meet any other route
// app.all('*',(req,res)=>{
//     res.status(404)
//     if(req.accepts('html')){
//     res.sendFile(path.join(__dirname,"views","404.html"))
//     }
//     else if (req.accepts('json')){
//         res.json({error: "404 not found"})
//     }
//     else{
//         res.type('txt').send("404 not found")
//     }
// })

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))

