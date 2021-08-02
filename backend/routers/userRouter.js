
const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const data = require('../data');
const {generateToken, auth} = require('../utils');


const userRouter = express.Router();

userRouter.get('/seed' ,  expressAsyncHandler(async (req,res)=> {
   await User.remove({})
const newUsers = await User.insertMany(data.users)


res.send({newUsers});
}));
userRouter.post('/signup' ,  expressAsyncHandler(async (req,res)=> {
const user = new User({name : req.body.name, password : bcrypt.hashSync(req.body.password,8), email : req.body.email});
const newUser = await user.save();
res.send({name: newUser.name,
   email: newUser.email,
   _id : newUser._id,
   isAdmin: newUser.isAdmin,
   token: generateToken(newUser)});
}));



userRouter.get('/', expressAsyncHandler(async (req,res) => {
   const users = await User.find({});
   res.send(users)
}))

userRouter.post('/singin', expressAsyncHandler(async (req,res) => {
const user = await User.findOne({email : req.body.email});
if(user){
   if(bcrypt.compareSync(req.body.password,user.password)){
      res.send({
         name: user.name,
         email: user.email,
         _id : user._id,
         isAdmin: user.isAdmin,
         token: generateToken(user)
      });

      return;
   }
}

}))

userRouter.get('/:id', expressAsyncHandler(async (req,res) => {
   
   const user = await User.findById(req.params.id);
   if(user){
      res.send(user);
   }else{
      res.status(404).send({message : 'user Not found'});
   }
}));


userRouter.put('/update/:id', auth, expressAsyncHandler( async (req, res) => {
   const user = await User.findById(req.params.id);
   
   if(user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if(req.body.password){
         user.password = bcrypt.hashSync(req.body.password, 8);
      }
      
      const newInfo = await user.save();
      res.send({
         _id: newInfo._id,
         name: newInfo.name,
         email: newInfo.email,
         isAdmin: newInfo.isAdmin,
         _token: generateToken(newInfo),
      });
   }else{
      res.status(404).send({message : 'user cannot be updated'})
   }

}))

module.exports = userRouter;