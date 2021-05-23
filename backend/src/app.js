const express = require('express')
const path = require('path')
const app = express()
const public = path.join (__dirname, '../public')
const db = require('./db')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'idontreallycare123456'

app.set('views', path.join (__dirname, '../views'));
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.static(public))

app.get('/',(request,response)=>{
    response.render('index')
})

app.get('/login',(request,response)=>{
    response.render('login')
})

app.post('/userLogin', async (request,response)=>{
    const {email, password} = request.body
    const user = await User.findOne({email}).lean()

    if(!user){
        return response.json({status:'error', error: 'Invalid email or password'})
    }

    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({
            id:user._id,
            email:user.email
        }, JWT_SECRET)
        return response.json({status:'ok', data: token})
    }

    return response.json({status:'error',error:'Invalid email or password'})
})

app.post('/register', async (request,response)=>{
    const {username,email, password: plainTextPassword} = request.body;

    if(!email || typeof email !== 'string'){
        return response.json({status:'error', error: 'Invalid email'})
    }

    if(plainTextPassword.length <= 5){
        return response.json({status:'error', error: 'Your password should have atleast 6 characters'})
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return response.json({status:'error', error: 'Invalid password'})
    }

    if(!username || typeof username !== 'string'){
        return response.json({status:'error', error: 'Invalid username'})
    }

    const password = await bcrypt.hash(plainTextPassword,10)

    try {
        const response = await User.create({
            username,
            email,
            password
        })
        console.log('User created', response)
    } catch (error) {
        if(error.code === 11000){
            return response.json({status: 'error', error:'Email already used ...'})
        }
        throw error
    }
    return response.json({status: 'ok'})
})

app.listen(3000,()=>{
    console.log("Server up on 3000")
})
