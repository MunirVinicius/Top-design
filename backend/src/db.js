const mongoose = require('mongoose')
const User = require('../model/user')
mongoose.connect('mongodb://localhost:27017/topdesign',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})



