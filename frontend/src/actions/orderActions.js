import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CREATE_PAY_FAIL, CREATE_PAY_REQUEST, CREATE_PAY_SUCCESS, CREATE_USER_REQUEST, EMPTYCART, GET_ORDER_BY_ID_FAIL, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS } from "../types"
export const placeOrder = (order) => async (dispatch, getState) => {
dispatch({
    type: CREATE_USER_REQUEST,
    payLoad : order
});
try{

    const {
        orderItems,
        shipping,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = order;
    
    const {userInfo} = getState().user;
    
    const res = await fetch("http://localhost:5000/api/orders", 
    {
        method : "POST",
        headers : {
            "content-type" : "application/json",
            "authorization" : `Bearer ${userInfo.token}`
    } ,
    body : JSON.stringify({
         orderItems,
         shipping, 
         paymentMethod,
         itemsPrice,
         taxPrice,
         shippingPrice,
         totalPrice 
        })
    }
    )
    const newOrder = await res.json()
 
    
    dispatch({
        type : CREATE_ORDER_SUCCESS,
        payLoad : newOrder
    });
    
    dispatch({
        type : EMPTYCART
    });
    
    localStorage.removeItem('cartItems');
    
    
   

}catch(e){
    dispatch({
        type : CREATE_ORDER_FAIL,
        error : e.message
    })
}
};

export const findOrderById = (id) => async (dispatch, getState) => {
    dispatch({
        type : GET_ORDER_BY_ID_REQUEST,
        payLoad : id
    });
    try {
        const {userInfo} = getState().user
        
    const res = await fetch(`http://localhost:5000/api/orders/${id}`,{
        headers : {authorization : `Bearer ${userInfo.token}`}
    });
   const order = await res.json();
   
    dispatch({
        type : GET_ORDER_BY_ID_SUCCESS,
        payLoad : order
    })
   
    } catch(e){
        dispatch({
            type : GET_ORDER_BY_ID_FAIL,
            error : e.message
        });
    }
    

}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
        type : CREATE_PAY_REQUEST,
        payLoad : {order , paymentResult}
    });
    try{
        const {userInfo} = getState().user 
        const res = await fetch(`http://localhost:5000/api/orders/${order._id}/pay`,
        {
            method : 'PUT',
            headers : {
                authorization : `Bearer ${userInfo.token}`
            }
        }
        );
        const orderResult = await res.json();
        dispatch({
            type: CREATE_PAY_SUCCESS,
            payLoad : orderResult
        })

    }catch(e){
        dispatch({
            type : CREATE_PAY_FAIL,
            error : e.message
        });
    }

};

export const getOrderHistory = () => async (dispatch, getState) => {
 
    dispatch(
        {
            type : GET_ORDER_HISTORY_REQUEST,
        }

    )
    
    try{
       
        const {userInfo} = getState().user;
        const res = await fetch('http://localhost:5000/api/orders/history',
        {
            headers : {
                authorization : `Bearer ${userInfo.token}`
            }
        }
        );
        
        const history = await res.json();
       
        dispatch({
            type : GET_ORDER_HISTORY_SUCCESS,
            payLoad : history
        })

    }catch(e){
        dispatch({
            type : CREATE_PAY_FAIL,
            error : e.message
        });
    }
}