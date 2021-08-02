import React, { useEffect, useState } from 'react'
import {PayPalButton} from 'react-paypal-button-v2';
import {useDispatch, useSelector } from 'react-redux'
import { findOrderById, payOrder } from '../actions/orderActions'
import { CREATE_PAY_RESET } from '../types';




function OrderScreen({
    ...props
}) {

    const order = useSelector((state) => state.orderDetails);
    const {loading : loadingPay, error : errorPay, success : successPay} = useSelector((state) => state.orderPay)
   
    const {loading, orderById , error} = order
    const {
        shippingDetails,
        orderItems,
        itemsPrice ,
    shippingPrice ,
    paymentMethod,
    taxPrice,
    totalPrice, 
    isPaid ,
    isDelivered, 
} = orderById


    const [sdkReady, setSdkReady] = useState(false)
    const orderId = props.match.params.id;
const dispatch = useDispatch()
    useEffect(() => {
const addPayPalScript = async () => {
    
    const res = await fetch('http://localhost:5000/api/config/paypal');
    const id = await res.json();
    
  
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${id}`;
    
    script.async = true;
    script.onload = () =>  setSdkReady(true); 
    //document.body.appendChild(script);
       
    
}
   
    if(!orderById._id || successPay || (orderById && orderId !== orderById._id)){
          dispatch(findOrderById(orderId))
          dispatch({
              type: CREATE_PAY_RESET
          });
         
    } else{
        if(!isPaid){
            if(!window.papal){
                addPayPalScript();
                
                
            }else{
                setSdkReady(true);
                
            }
        }
    }

  

      
    
},[orderId, dispatch, orderById]);


const successHandler = (paymentResult) => {
dispatch(payOrder(order, paymentResult));
}
   
  
    


 
  
  

    
    
    return !loading !== true ? <div>
        loading...
    </div> : error ? <div>
        {error}
    </div> : ( 
        <div>
          { loading === undefined ? 'loading...' : 
          <div className="container">
          <div className="order-columns">
              <div className="order-col-1">
              <ul>
                  <li>
                      <div className="card shipping-details">
                      <div>
                            <strong>Name :</strong> <span>{shippingDetails.fullName}</span>
                            </div>
                            <br />
                            <div>
                            <strong>Address :</strong> {shippingDetails.address},{' '}
                            {shippingDetails.city},{' '}
                            {shippingDetails.postalCode},{' '}
                            {shippingDetails.country}
                            </div>
                          <div className={isDelivered ? 'delivered' : 'not-delivered'}>
                         <span>{isDelivered ? 'delivered' : 'not delivered'}</span> 
                          </div>
                     
                      </div>
                  </li>
                  <li>
                      <div className="card payment-details">
                          <strong>Payment Method</strong> {paymentMethod}
                          <div className={isPaid ? 'paid' : 'not-paid'}>
                              <span>{isPaid ? 'paid' : 'not Paid'}</span> 
                          </div>
                          
                      </div>
                  </li>
                  <li>
                      <div className="card payment-details">
                      <div className='grid-2-cols'>
<div className='products-col'>
{orderItems.map((item) => (<div key={item.product} className='cartItem'>
  <img className="small-img" src={item.image} alt={item.name}></img>
  <h3>{item.name}</h3>
                      <h3>{item.price}</h3>
</div>))}
</div>
<div className='card-col'>
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
              <div className="card proceed-checkout pay-card">
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
                      <div>
                          {!isPaid && (
                              <div>
                                  {sdkReady ? (
                                      'loading... here'

                                  ) :
                                  
                                  
                                  (
                                     <>
                                     {errorPay && <strong>{errorPay.message}</strong>}
                                     {loadingPay && <strong>loading...</strong> }
                                    <PayPalButton
                                    className='paypal-button'
                                    amount={orderById.totalPrice}
                                  onSuccess={successHandler}
                                    >
      
                                    </PayPalButton> 
                                    </>
                                  )
                                
                                }
                              </div>
                          )
                           }  
                      </div>

          </div>
      </div>
      </div>
          }
        </div>
    )
}

export default OrderScreen

