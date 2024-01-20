const jwt = require("jsonwebtoken");


async function isValidJwt(token){
    jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET , function(err, decoded) {
        if (err){
            return false;
        }else{
            return true;
        }
    });
}

module.exports = isValidJwt;