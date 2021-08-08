import {CREATE_USER_FAIL, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, GET_USER_BY_ID_FAIL, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, SIGNOUT_USER, SIGN_IN_USER_FAIL, SIGN_IN_USER_REQUEST, SIGN_IN_USER_SUCCESS, UPDATE_USER_BY_ID_FAIL, UPDATE_USER_BY_ID_REQUST, UPDATE_USER_BY_ID_RESET, UPDATE_USER_BY_ID_SUCCESS } from "../types";

const userReducers = (state = {}, action) => {
switch(action.type){
    case SIGN_IN_USER_REQUEST:
        return({loading: true})
    case SIGN_IN_USER_SUCCESS:
    return({
        loading : false , userInfo : action.payLoad
    })
    case SIGN_IN_USER_FAIL:
        return({
            loading : false, error : action.error
        })
        case SIGNOUT_USER:
            return({
                loading: false,
                userInfo : null
            });
        
            
                default:  return state

}

}
export const signupReducer = (state = {} , action) => {
    switch(action.type){
        case CREATE_USER_REQUEST:
                return({loading: true})
            case CREATE_USER_SUCCESS:
            return({
                loading : false , userInfo : action.payLoad
            })
            case CREATE_USER_FAIL:
                return({
                    loading : false, message : action.data
                })
            
                default:  return state
    }
}

export const userInfoByIdReducer = (state = {}, action) => {
    switch(action.type){
        case GET_USER_BY_ID_REQUEST:
            return({loading : true});
        case GET_USER_BY_ID_SUCCESS:
            return({loading : false, userById: action.payLoad})
        case GET_USER_BY_ID_FAIL:
            return ({loading : false ,  error : action.error});

        default: return state;
    }
};

export const updateUserInfoReducer = (state = {}, action) => {
    switch(action.type){
        case UPDATE_USER_BY_ID_REQUST:
            return({loading : true, userNewInfo : {}})
        case UPDATE_USER_BY_ID_SUCCESS:
            return({
                loading : false, userNewInfo : action.payLoad
            });
        case UPDATE_USER_BY_ID_FAIL:
            return({loading : false, error : action.error});
        case UPDATE_USER_BY_ID_RESET:
            return {loading : false, userNewInfo : {}}
        default: return state
    }
}


export default userReducers