
const jwt = require('jsonwebtoken');


const authToken = (req, res, next) => {
    const token = req.header("Authentication");
    if(!token){
        return res.status(401).send("Access Denied");
    }

    if(!token.startsWith("Bearer ")){
        return res.status(401).send("Access Denied");
    }

    console.log(token);

    try {
        token = token.slice(7);
        console.log(token);
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        next();
    } catch (err) {
        return res.status(400).json({message: "Invalid token"});
    }
}

module.exports = authToken;