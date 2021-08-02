import { GET_PRODUCT } from "../types";

 const detailsReducer = (state = {productDetails : {} }, action) => {
    switch(action.type) {
        case GET_PRODUCT: 
        return({productDetails : action.payLoad})

            default:
                return state;
    };
};

export default detailsReducer;
