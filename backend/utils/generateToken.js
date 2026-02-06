import jwt from 'jsonwebtoken';

const generateAccessToken = (id, role)=>{
    return jwt.sign(
        {id, role}, 
        process.env.JWT_SECRET,
        {expiresIn: "15m"}
    );
};

const generateRefreshToken = (id)=>{
    return jwt.sign(
        {id}, 
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"}
    );
};

export {generateAccessToken, generateRefreshToken};