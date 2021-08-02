import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CREATE_ORDER_RESET, CREATE_ORDER_REQUEST, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_ID_FAIL, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAIL, CREATE_PAY_RESET, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_HISTORY_FAIL } from "../types";

const orderReducers = (state = {}, action) => {
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return({loading : true, order : action.payload})

        case CREATE_ORDER_FAIL: 
        return({loading : false, error : action.error})

        case CREATE_ORDER_SUCCESS:
            
            return({loading : false, success : true, createdOrder : action.payLoad})

            case CREATE_ORDER_RESET: 
            return {};
        default: return state
    }
}

export const orderDetailsReducers = (state = {  }, action) => {
switch(action.type){
    case GET_ORDER_BY_ID_REQUEST:
        return({loading : true, orderById : action.payLoad})
    case GET_ORDER_BY_ID_SUCCESS:
        return({loading : false, success : true, orderById : action.payLoad});
    case GET_ORDER_BY_ID_FAIL: 
    return({loading : false , erorr : action.error})
default: return state
}
}

export const orderPayReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_USER_REQUEST:
            return({loading : true})
        case CREATE_USER_SUCCESS:
            return({loading : false , success : true})
            case CREATE_USER_FAIL:
                return({loading : false, error : action.erorr})
            case CREATE_PAY_RESET:
                return {};
        default: return state
    }
}

export const orderHistoryReducer = ( state = {} ,action) => {
    switch(action.type){
        case GET_ORDER_HISTORY_REQUEST:
            return({loading : true})

        case GET_ORDER_HISTORY_SUCCESS:
            return ({loading : false, history : action.payLoad })
        
        case GET_ORDER_HISTORY_FAIL:
            return({loading: false, error : action.error}) 
        default: return state
    }

}
 
export default orderReducers;