const mongoose = require('mongoose')
const User = require('../model/user')
const connection = mongoose.connect('mongodb://localhost:27017/topdesign',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

module.exports = connection;


