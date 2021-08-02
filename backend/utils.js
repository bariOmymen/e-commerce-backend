const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    
    
return jwt.sign({
    name : user.name,
    email : user.email,
    isAdmin: user.isAdmin,
    password: user.password,
    _id : user._id,
}, process.env.SECRET,
{expiresIn:'20d'}
)
};

const auth = (req, res, next) => {
    const authorization = req.headers.authorization;
   
    if(authorization){
        const token = authorization.slice(7, authorization.length);
        jwt.verify(
            token,
            process.env.SECRET || "secret",
            (err,decode) => {
                if(err){
                    res.status(401).send({message : 'Invailed token'})
                }else{
                    req.user = decode;
                    
                    next();
                }
            }
            )
    }else{
        res.status(401).send({message : 'No Token'});
    }
}

module.exports = {generateToken, auth}