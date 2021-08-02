import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import { getProduct } from '../actions/productsActions'
import { addToCart } from '../actions/cartActins';
import Rating from '../components/Rating'



const ProductScreen = ({product,getProduct, addToCart, ...props}) => {
    
    const match = props.match;

    const [quantity, setQuantity] = useState(1);

    const addToCartHandler = () => {
        addToCart(match.params.id,quantity)
        props.history.push(`/cart`)
    }
   
    //const product = data.products.find(x => x._id === props.match.params.id)
   
    
    useEffect(()  =>  { 
        getProduct(match.params.id)}
      
    ,[getProduct,match]);
    

    return (
        <div className='columns'>
            <div className='col-1'>
            <Link className='back-button' to='/'>Back</Link>
            <img className='product-img' src={product.image}alt={product.description}/>
            </div>
            <div className='col-2 '>
                <div className="margin-down">
            <div >
                <h2>
                {product.name}
                </h2>
            </div>
            <div>
                discription: <br />
                {product.description}
            </div>
            <div>
              Price  ${product.price}
            </div>
            <div>
                {<Rating rating={product.rating} numReviews={product.numReviews} />}
            </div>
            </div>
            </div>
            <div className='col-3'>
            <div className="product-card margin-down">
                <div>
                    <p className='margin-left'>Price</p>
                        <h4 className='margin-right'>
                            ${product.price}
                        </h4>
                </div>
                <div>
                    <p className='margin-left'>Status</p>
                        <h4 className={product.countInStock > 0 ? "success margin-right" : "error margin-right" }>
                            {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                        </h4>
                </div>
                <div>
                    <select className='quantity-select' value={quantity} onChange={(e) => {
                        setQuantity(e.target.value)
                    }}>

                        {
                            [...Array(product.countInStock).keys()].map(x => <option value={x + 1} >{x + 1}</option>)
                        }
                    </select>
                </div>
                <div className='add-to-cart-container'>
                    <button className='add-to-cart-button' onClick={addToCartHandler}>
                        add to cart
                    </button>
                </div>

            </div>
            </div>
           
        </div>
    )
}

export default connect((state) => ({product : state.product.productDetails}),{getProduct, addToCart})(ProductScreen);
