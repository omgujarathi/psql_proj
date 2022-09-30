const jwt = require("jsonwebtoken")

const verifyToken =(req,res,next)=>{
    const token = req.body.token || req.query.token||req.headers["x-access-token"]
    if(!token){
        return res.status(404).send("Token Not Found")
    }

    try{
        const decodedToken = jwt.decode(token,process.env.JWT_TOKEN)
        console.log(decodedToken)
        req.user = decodedToken
    }
    catch (err)
    {
        return res.status(401).send("Invalid Token Found")
    }
    next()
}

module.exports = {verifyToken}