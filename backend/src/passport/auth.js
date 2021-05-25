const jwt = require('jsonwebtoken')
const JWT_SECRET = 'idontreallycare123456'

module.exports = (request, response,next) => {
    const aheader = request.headers.authorization
     
    if(!aheader){
        return response.status(401).send({error:'No token'})
    }

    // if(!/^Bearer$/i.test(scheme)){
    //     return response.status(401).send({error:'Incorrect format token'})
    // }

    jwt.verify(aheader, JWT_SECRET, (err, decoded)=>{
        if(err){
            return response.status(401).send({error:'Invalid token'})
        }
        return next()
    })
}