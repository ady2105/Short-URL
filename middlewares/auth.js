const {getUser} = require('../service/auth')

function checkAuthorization(req, res, next){
    req.user = null
    const authorizationHeaderValue = req.headrs["authorization"]
    if(
        !authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer' )
        ) 
            return next()
    
    const token = authorizationHeaderValue.split("Bearer ")[1]
    const user = getUser(token)

    req.user = user
    return next()
}

function restrictTo(roles = []){
    return function (req, res, next){
        if(!req.user) return res.redirect("/login")
        
        if(!roles.includes(req.user.role)) return res.end("Unauthorized")
        
        return next()
    }

}

module.exports = {
    checkAuthorization,
    restrictTo,
}