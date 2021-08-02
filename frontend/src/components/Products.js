import React from 'react'
import Rating from './Rating'
import {Link} from 'react-router-dom'
import {Product} from './Product'
import { fetchProducts } from '../actions/productsActions'
import { connect } from 'react-redux'


const Products = ({product},props) => {
    return (
        <Product className="card" >
        <Link to={`/product/${product._id}`}>
    
       <Product.Image className="medium"  src={product.image} alt={product.description}/>
    
     </Link>
     <div className="card-body">
     <Link to={`/product/${product._id}`}>
     <Product.Title> {product.name} </Product.Title>
     </Link>
     <div className="price">
       <h3>
         {product.price}
       </h3>
     </div>
     <div>
     <Rating key={product._id} rating={product.rating} numReviews={product.numReviews} />
     </div>
     </div>
     </Product>
     
     

      
      
       
    )
}

export default connect((state) => ({products: state.products.items}),{fetchProducts,})(Products)
