import { FETCH_PRODUCTS, GET_PRODUCT } from "../types";

export const fetchProducts = () => async (dispatch) => {
   
    const res = await fetch('http://localhost:5000/api/products');
    const {products} = await res.json()
    
    dispatch({
        type: FETCH_PRODUCTS,
        payLoad : products
    });

};

export const getProduct = (id) => async (dispatch) => {
   
    const res = await fetch(`http://localhost:5000/api/products/${id}`)
    const product = await res.json();
     
    
    dispatch({
        type: GET_PRODUCT,
        payLoad : product
    });
};

