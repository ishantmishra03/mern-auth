import jwt from 'jsonwebtoken';

export const userAuth = async (req,res,next) => {
    try {
        const { token } = req.cookies;

        if(!token){
            return res.json({success: false, message : "Not Authorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.id){
            req.userId = decoded.id;
        } else {
            return res.json({success: false, message : "Not Authorized"});
        }
        next();
    } catch (error) {
        return res.json({success: false, message : error.message});
    }
};

