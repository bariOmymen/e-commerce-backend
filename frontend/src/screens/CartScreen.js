import React, { useState } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteItem } from '../actions/cartActins';

const CartScreen = (props) => {
const id = props.match.params.id;
const addToCart = props.addToCart;
const cartItems = props.cartItems;
const deleteItem = props.deleteItem;
const [quantity,setQuantity] = useState()

    return (
        <div className='grid-2-cols'>
<div className='products-col'>
{cartItems.map((item) => (<div key={item.product} className='cartItem'>
    <img className="small-img" src={item.image} alt={item.name}></img>
    <h3>{item.name}</h3>
    <select className='quantity-select' value={quantity || item.qty} onChange={(e) => { setQuantity(e.target.value); addToCart(id,e.target.value)}}>quantity   {
                            [...Array(item.countInStock).keys()].map(x => <option value={x + 1} >{x + 1}</option>)
                        }</select>
                        <h3>{item.price}</h3>
                        <button className='delet-button' onClick={() => deleteItem(item.product)}>delete</button>

</div>))}
</div>
<div className='card-col card'>
<div className='card-container'>
<div>
    <p> total price of ({cartItems.reduce((a,c) => a+( Number(c.qty) ),0 )}) items :</p>
    <h3> {cartItems.reduce((a,c) => a + (c.price*c.qty),0 )}</h3>
    </div>
    
       
        <Link  className='proceed-button button' to='/shipping'> proceed</Link>


</div>
</div>
          
        </div>
    )
}

export default connect((state) => ({cartItems : state.cart.cartItems}),{ deleteItem})(CartScreen)
