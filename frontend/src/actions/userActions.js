import { SIGN_IN_USER_SUCCESS, SIGN_IN_USER_FAIL, SIGN_IN_USER_REQUEST, SIGNOUT_USER, CREATE_USER_FAIL, CREATE_USER_SUCCESS, CREATE_USER_REQUEST, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_FAIL, UPDATE_USER_BY_ID_REQUST, UPDATE_USER_BY_ID_FAIL, UPDATE_USER_BY_ID_SUCCESS } from "../types"

export const signIn = (email, password) => async (dispatch) => {
    
dispatch({type : SIGN_IN_USER_REQUEST, payLoad: {email, password}})
try{
    console.log('erroro but not');
    await fetch('http://localhost:5000/api/users/singin',{
        method : 'POST',
        headers : {"content-Type" : "application/json" },
        body : JSON.stringify({email,password})
    }).then(res => res.json()).then(data => {
       if(data?.message){
        dispatch({
            type: SIGN_IN_USER_FAIL,
            error : data
        })
       }else{dispatch({
        type : SIGN_IN_USER_SUCCESS,
        payLoad : data
    })
 localStorage.setItem('userInfo', JSON.stringify(data))
}
        
   
})

}
catch(error){
    console.log(error);
    dispatch({
        type: SIGN_IN_USER_FAIL,
        error : error.message
    })
  // e.response && e.response.data.message ? e.response.data.message : e.message
}
} 
export const signOut = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingDetails')
    
    dispatch({
        type : SIGNOUT_USER,
    })
}

export const signUp = (name,email,password) => async (dispatch) => {
    dispatch({
        type: CREATE_USER_REQUEST,
        payLoad:
        {loading : false}});
    try{
        
        await fetch('http://localhost:5000/api/users/signup',{
            method : 'POST',
            headers : {"content-Type" : "application/json" },
            body : JSON.stringify({email,password,name})
        }).then(res => res.json()).then(data => {
        
            dispatch({
            type : CREATE_USER_SUCCESS,
            payLoad : data
        })
        dispatch({ type :SIGN_IN_USER_SUCCESS,
            payLoad : data})
        localStorage.setItem('userInfo', JSON.stringify(data))
    })
    }catch(e) {
        dispatch({
            type: CREATE_USER_FAIL,
            payLoad :  e.response && e.response.data.message ? e.response.data.message : e.message
        })
    }

}

export const getUserById = (id) => async (dispatch)  => {
dispatch({
    type : GET_USER_BY_ID_REQUEST
});

try{
    
    const res = await fetch(`http://localhost:5000/api/users/${id}`);
    const userById = await res.json();
    dispatch({
        type : GET_USER_BY_ID_SUCCESS,
        payLoad : userById
    })

}catch(e){
    dispatch({
        type : GET_USER_BY_ID_FAIL,
        error : e.message
    })
}
};

export const updateUserInfo = (newInfo) => async (dispatch, getState) => {
    dispatch({
        type : UPDATE_USER_BY_ID_REQUST,
        
    })
 

    try{
const {userInfo} = getState().user
        const res = await fetch(`http://localhost:5000/api/users/update/${newInfo._id}`,
        {
            method : 'PUT',
            headers : {
                "content-Type" : "application/json",
                authorization : `Bearer ${userInfo.token}`,
            },

            body : JSON.stringify(newInfo)
        });

        const userNewInfo = await res.json();
        
        dispatch({
            type : UPDATE_USER_BY_ID_SUCCESS,
            payLoad : userNewInfo
        })

    }catch(e){
        dispatch({
            type : UPDATE_USER_BY_ID_FAIL,
            error : e.message
        })
    }
}