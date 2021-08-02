import { ADD_TO_CART, DELETE_ITEM, EMPTYCART, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_DETAILS } from "../types";

const cartReducers = ( state = {cartItems : []  }, action ) => {
    switch(action.type){
        case ADD_TO_CART:
            const cartItem = action.payLoad; 
            
        const exist = state.cartItems.find(x => x.product === cartItem.product);
        
        if(exist){
            return({ cartItems: state.cartItems.map(x => x.product === exist.product ? cartItem : x) })
        }else{
            return({cartItems : [ ...state.cartItems, cartItem]})
        }

        case DELETE_ITEM: 
        
        return({cartItems : action.payLoad.cartItems })
        case EMPTYCART:
            return ({cartItems : []})

        default:
             return state
    }
};

export const userDetailsReducer = (state= {
    shippingDetails : {},
    payment : ''
}, action) => {
    switch(action.type){
        case SAVE_SHIPPING_DETAILS:
            return({shippingDetails : action.payLoad})
        case SAVE_PAYMENT_METHOD: 
        return({payment : action.payLoad})

        default:
             return state
    }
}

export default cartReducers