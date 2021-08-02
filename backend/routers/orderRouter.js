const express = require('express')
const Order = require('../models/orderModel')
const expressAsyncHandler = require('express-async-handler')
const {auth} = require('../utils');

const orderRouter = express.Router();

orderRouter.get('/history', auth, expressAsyncHandler(async (req, res) => {
    const history = await Order.find({user : req.user._id});
    
    if(history){
        res.send(history);
    }else{
        res.send({message : 'this user has no history record'})
    }
}));


orderRouter.post('/', auth,
expressAsyncHandler(
     async (req,res) => {
         
    if(req.body.orderItems === 0){
        res.status(400).send({message : 'cart is empty'})
    }else {
       
        const newOrder = new Order({
            orderItems : req.body.orderItems,
            shippingDetails : req.body.shipping,
            paymentMethod : req.body.paymentMethod,
            itemsPrice : req.body.itemsPrice,
    shippingPrice : req.body.shippingPrice,
    taxPrice : req.body.taxPrice,
    totalPrice : req.body.totalPrice,
    user : req.user._id,
    isPaid : req.body.isPaid,
    paidAt : req.body.paidAt,
    isDelivered : req.body.isDelivered,
   
        })
        const order = await newOrder.save();
        res.status(201).send({message : "new order has been created", order});
    }
    
}));

orderRouter.get('/:id',auth ,expressAsyncHandler( async (req,res) => {
    const order = await Order.findById(req.params.id);
  
    if(order){
      
        res.send(order);
    }else{
res.status(404).send({message : "order not found"});
    }

}));

orderRouter.put('/:id/pay', auth, expressAsyncHandler(async (req, res) => {
    const order = Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentDetails = {
            id : req.body.id,
                email : req.body.email_address,
                status : req.body.status,
                update_time : req.body.update_time
        }

        const updatedOrder = await order.save();
        res.send({message : 'Order updated', order: updatedOrder})
    }
    else{
        res.status(404).send({message : 'order not found'});
    }
}));



module.exports = orderRouter;