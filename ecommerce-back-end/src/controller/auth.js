const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup=(req, res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user)return res.status(400).json({
            message:"user already exists",
        });

        const {
            firstName,
            lastName,
            email,
            password
        }=req.body;
        const _user = new User({firstName,
            lastName,
            email,
            password,
            username:Math.random().toString()
        });

        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                message:"Something went wrong",
                // message:error
            });
            }
            if(data){
                return res.status(201).json({
                    message: "user created successfully"
                })
            }
        });
    })
}



exports.signin=(req, res,next)=>{
    User.findOne({email:req.body.email})
    .exec((error, user)=>{
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token =jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
                const {_id,firstName,lastName,email,role,fullname} = user;
                res.status(200).json({
                     token,
                     user:{_id,firstName,lastName,email,role,fullname}
                });
            }else{
                return res.status(400).json({message:"Invalid Pass"})
            }
        }else{
            return res.status(400).json({message:"Something went wrong"});
        }
    });
}

// midddleware function
exports.requireSignin=(req, res, next) => {
    const token=req.headers.authorization.split(" ")[1];
    const user=jwt.verify(token,process.env.JWT_SECRET);
    req.user=user;
    next();
    //jwt decode
}