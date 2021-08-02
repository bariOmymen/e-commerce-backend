import React, { useEffect } from 'react'
import Products from '../components/Products'
import {connect} from 'react-redux'
import { fetchProducts } from '../actions/productsActions'


const HomeScreen = ({products, fetchProducts}) => {

    
    useEffect(() => {
    
            fetchProducts()
    
    },[fetchProducts])

    return (
        <div className="container row-center">

 
        { products ? products.map(product => (

   <Products key={product._id} product={product}/>
 

)) : "loading.."} 
 
        </div>
    )
}

export default connect((state) => ({products: state.products.items}),{fetchProducts,})(HomeScreen)
 /* <Product key={product._id} product={product}/> 
 
   <product.Image src={product.image} alt={product.title} />
                    <Product.Body className=''>
                        <Product.Title className='' >{product.title}</Product.Title>
                        
                    </Product.Body>
 
 */