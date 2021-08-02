const express = require('express')
const Product = require('../models/productModel')
const data = require('../data')
const expressAsyncHandler = require('express-async-handler')


const productsRouter = express.Router();

productsRouter.get('/seed', expressAsyncHandler( async (req,res) => {
    //await Products.remove({});
    const newProducts = await Product.insertMany(data.products);
    
    res.send({newProducts});
}

));


productsRouter.get('/', expressAsyncHandler( async (req,res) => {
    
    const products = await Product.find({});
    res.send({products});
}

));


productsRouter.get('/:id', expressAsyncHandler( async (req,res) => {
    
    const products = await Product.findById(req.params.id);
    if(products) {
        res.send(products);
    }else{
        res.status(404).send({message : 'product not found'});
    }
    
}

));

module.exports = productsRouter;