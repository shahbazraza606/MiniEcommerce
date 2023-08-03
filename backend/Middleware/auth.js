const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
   let token = req.headers['token'];
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized User : No Access' });
        }
        req.user = decoded;
        next();
    }
    )
}
const verifyUser = (req, res, next) => {
    let type = req.headers['type'];
    console.log("type", type);
    if (type=== "admin") {
        next();
    }
    else {
        return res.status(401).json({ message: 'Unauthorized User : Only Admin Access' });
    }
}
module.exports = {
    verifytoken,
    verifyUser
}