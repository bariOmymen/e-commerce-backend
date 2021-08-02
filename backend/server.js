const express = require('express');
const data = require('./data');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter  = require('./routers/userRouter');
const orderRouter  = require('./routers/orderRouter');
const productsRouter = require('./routers/productRouter');


const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

mongoose.connect( process.env.MONGODB_URL || 'mongodb://localhost/amazonia',
{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}
);

app.get('/', (req,res) => {
    res.send('working server');
});



app.use('/api/users', userRouter );

app.use('/api/products', productsRouter);


/*app.use((err,res,req, next)=> {
    res.status(500).send({message : err.message});
});*/

app.get('/api/config/paypal',(req, res) => {
   
    res.send(JSON.stringify(process.env.PAYPAL_CLIENT_ID) ||'SD');
})

app.use('/api/orders',orderRouter);

app.get('/api/products/:id', (req,res) => {
    const product = data.products.find((product => product._id === req.params.id))
    
    res.send(product);
});

app.listen(5000, () => {
    console.log('server at http://localhost:5000')
})