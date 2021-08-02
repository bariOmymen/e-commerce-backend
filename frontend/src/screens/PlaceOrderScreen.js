import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { placeOrder } from '../actions/orderActions'
import ChexkoutFlow from '../components/ChexkoutFlow'
import { CREATE_ORDER_RESET } from '../types'

function PlaceOrderScreen({ 
    cartItems, 
    paymentMethod, 
    placeOrder,
     order, 
    ...props
}) {

   const shipping = JSON.parse(localStorage.getItem("shippingDetails"))
   
    const {success, createdOrder } = order
    const dispatch = useDispatch()
    
    useEffect(() => {
       
if(success){
  
                   
    props.history.push(`/order/${createdOrder.order._id}`);
    dispatch({
        type : CREATE_ORDER_RESET
    });
}
    },[success, props, dispatch,createdOrder]);

    const itemsPrice = cartItems.reduce((a,c) => a + (c.price*c.qty),0 );
    const taxPrice = cartItems[0].price 
    const shippingPrice = cartItems[0].price 
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    return (
        <div className="container">
            <ChexkoutFlow step1 step2 step3 step4 />
            <div className="order-columns">
                <div className="order-col-1">
                <ul>
                    <li>
                    
                        <div className="card shipping-details">
                            <div>
                            <strong>Name :</strong> <span>{shipping.fullName}</span>
                            </div>
                            <br />
                            <div>
                            <strong>Address :</strong> {shipping.address},{' '}
                            {shipping.city},{' '}
                            {shipping.postalCode},{' '}
                            {shipping.country}
                            </div>
                        </div>
 
                    </li>
                    <li>
                        <div className="card payment-details">
                            <h3>Payment Method</h3>
                            <strong>{paymentMethod}</strong> 
                            
                        </div>
                    </li>
                    <li>
                        <div className="card payment-details">
                        <div className='grid-2-cols'>
<div className='products-col'>
{cartItems.map((item) => (<div key={item.product} className='cartItem'>
    <img className="small-img" src={item.image} alt={item.name}></img>
    <h3>{item.name}</h3>
                        <h3>{item.price}</h3>
</div>))}
</div>
<div className='card-total-col '>
<div className='container'>
<div>
    total : {itemsPrice}
</div>
</div>
</div>
          
        </div>
                            
                        </div>
                    </li>
                </ul>
                </div>
                <div className="card proceed-checkout place-order-checkout">
                    <div>
                   <strong>propducts:</strong> <span>${itemsPrice}</span>
                        </div>
                    <div>
                   <strong>shipping:</strong> <span>${shippingPrice}</span>
                        </div>
                    <div>
                   <strong>tax:</strong> <span>${taxPrice}</span>
                        </div>
                    <div>
                   <strong>total:</strong> <span>${totalPrice}</span>
                        </div>

                        
                        
                        <button className='place-order-button button' onClick={() => {
                            placeOrder({ orderItems :cartItems, shipping, paymentMethod,itemsPrice, shippingPrice, taxPrice, totalPrice })
                           
                   
                    }}>Place Order</button>

                    
              
            </div>
        </div>
        </div>
    )
}

export default connect((state) => ({
    shippingDetails: state.userDetails.shipping,
    cartItems: state.cart.cartItems,
    paymentMethod : state.userDetails.payment,
    order : state.orders,
   
})
,{
    placeOrder
})
 (PlaceOrderScreen)
