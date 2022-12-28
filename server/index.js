const express = require('express')
require('dotenv').config()
const notes = require('./data/noes.js')

const app = express()
const PORT =process.env.PORT|| 5000


app.get('/',(req,res)=>{
    res.send("Hello")
})

app.get('/api/notes', (req,res)=>{
    // res.send('almost there')
    res.json(notes)
})

app.get('/api/notes/:id', (req,res)=>{
    const note = notes.find(n=> n._id === req.params.id)
    res.json(note)
})

app.listen(PORT, ()=>{
    console.log('app is running');
})