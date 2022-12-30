const express = require('express')
require('dotenv').config()
const notes = require('./data/noes.js')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db')
const {notFound,errorHandler} = require("./middlewares/errorMiddleWare")
const app = express()
const PORT =process.env.PORT|| 5000
connectDB()
app.use(express.json())
// app.use(notFound , errorHandler)
app.get('/',(req,res)=>{
    res.send("Hello")
})

app.get('/api/notes', (req,res)=>{
  
    res.json(notes)
})

app.get('/api/notes/:id', (req,res)=>{
    const note = notes.find(n=> n._id === req.params.id)
    res.json(note)
})
app.use('/api/users',userRoutes)
app.listen(PORT, ()=>{
    console.log('app is running');
})