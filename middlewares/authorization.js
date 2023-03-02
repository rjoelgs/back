const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const generateToken = (payload) => {
    return jwt.sign(payload, secret);
}


const readToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error(error.message);
        throw new Error("Invalid token provided");
    }
}

const validateAccess = (req, res, next) => {
    try{
        var {authorization} = req.headers;
        if(authorization){
            var [type, token] = authorization.split(" ");
            if(!token) {
                throw new Error("Token not provided")
            }
            const payload = readToken(token);
            req.user = payload;
            next();
        } else throw new Error("Token is requiered to achieve this service.");
    } catch(error){
        res.status(403);
        res.end(error.message);
    }
    
}

module.exports = {generateToken, readToken, validateAccess};