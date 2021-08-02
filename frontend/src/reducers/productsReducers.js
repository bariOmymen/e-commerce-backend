import { FETCH_PRODUCTS } from "../types";

 const productsReducer = (state = {items : []}, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
           
            return({items: action.payLoad})

            default:
                return state;
    };
};

export default productsReducer