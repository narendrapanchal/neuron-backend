const jwt = require('jsonwebtoken');
const secret="secret_key";
const {User} = require("./model/user.model");
const authenticate = (req, res, next)=> {
    
    const userId = req.body.userId;
    if(userId){

        User.findById(userId).then(async()=>{
            let user=await User.findByIdAndUpdate(
                userId,
                { $inc: { count: 1 } },
                { new: true } 
              )
            next();
        }).catch(err=>{
            return res.status(403).json({ message: 'Forbidden - Insufficient privileges' });
        })
    }else{

        return res.status(403).json({ message: 'Forbidden - Insufficient privileges' });
    }
}
module.exports=authenticate;