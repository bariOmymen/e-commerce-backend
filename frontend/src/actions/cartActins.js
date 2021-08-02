
import { ADD_TO_CART, DELETE_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_DETAILS } from "../types";

export const addToCart = (productId,qty) => async (dispatch, getState) => {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`);
    const product = await res.json();
    dispatch({
        type: ADD_TO_CART,
        payLoad : {
        name : product.name,
        countInStock : product.countInStock,
        product : product._id,
        image : product.image,
        price : product.price,
        qty}

    });


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
   
}

export const deleteItem = (id) => async (dispatch, getState) => {

    const cartItems = getState().cart.cartItems.slice().filter(x => x.product !== id)
    dispatch({
        type : DELETE_ITEM,
        payLoad : {cartItems}
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const saveShippingDetails = (data) => async (dispatch) => {
dispatch({
    type: SAVE_SHIPPING_DETAILS,
    payLoad: data
});

localStorage.setItem('shippingDetails', JSON.stringify(data));
};

export const savePaymentMethod = (payment) => async (dispatch) => {
    dispatch({
        type : SAVE_PAYMENT_METHOD,
        payLoad : payment
    });
    localStorage.setItem('payment', JSON.stringify(payment));

}

