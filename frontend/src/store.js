import { createStore, applyMiddleware, compose, combineReducers  } from "redux";
import thunk from "redux-thunk"
import  productsReducers  from "./reducers/productsReducers";
import  detailsReducer  from "./reducers/detailsReducer";
import  cartReducers, { userDetailsReducer }  from "./reducers/cartReducers";
import userReducers, { signupReducer, updateUserInfoReducer, userInfoByIdReducer } from "./reducers/userReducers";
import orderReducers, { orderDetailsReducers, orderHistoryReducer, orderPayReducer} from "./reducers/orderReducers";

const initialState={
    cart : {
    cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
   
},
user : {
    userInfo:
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
},
orderDetails : {


orderById : {
    shippingDetails : {},
    orderItems : [],
    paymentMethod:''
}
},
userDetails : {
    shipping : localStorage.getItem("shippingDetails") ?
    JSON.parse(localStorage.getItem("shippingDetails")) : {}
    ,
     payment : localStorage.getItem("payment") ? JSON.parse(localStorage.getItem("payment")) : {}
},
userNewDetails : {
    newUserInfo : {}
}
};




const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
   
    combineReducers({
        products : productsReducers,
        product : detailsReducer,
        cart : cartReducers,
        user: userReducers,
        userSignup : signupReducer,
        userDetails : userDetailsReducer,
        userNewDetails : updateUserInfoReducer,
        userById : userInfoByIdReducer,
        orders : orderReducers,
        orderDetails: orderDetailsReducers,
        orderPay : orderPayReducer,
        orderHistory : orderHistoryReducer,
    
    },
    ),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
