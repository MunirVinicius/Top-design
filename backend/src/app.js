const express = require('express')
const path = require('path')
const app = express()
const public = path.join (__dirname, '../public')
const db = require('./db')

app.set('views', path.join (__dirname, '../views'));
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.static(public))

app.get('/',(request,response)=>{
    response.render('index')
})

app.post('/register', async (request,response)=>{
    console.log(request.body)
})

app.listen(3000,()=>{
    console.log("Server up on 3000")
})
