import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../actions/userActions';
import { useAuth } from '../router-helper';
const SinginScreen = ({userInfo, error, signIn, location,history, state}) => {
const auth = useAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    

    useEffect(() => {
            if(userInfo){
                history.push(redirect);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
    },[userInfo,redirect,history])

    const submitHandler =  (e) => {
        e.preventDefault();
        auth.signin(email,password);


       
    }

    

    return (
        <div className='signin'>
            <div className='container'>
            <form className='signin-form form' onSubmit={submitHandler}>
            <div>
                <label htmlFor="email">Email</label>
                <input value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email@email.coom"
                type="text">

                </input>
                </div>
<div>
                <label htmlFor="name">Name</label>
                <input value={password} 
                 type="text"
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Name">

                </input>
                </div>
                <div>
                    <input className='button submit-Button' type='submit' value="continue" />
                </div>
            </form>
            </div>
            <div className='no-account'>
            <p>dont have an acount? <Link to='/signup'>SIGNUP</Link></p>
            </div>
        </div>
       
    )
}

export default connect((state) => ({userInfo : state.user.userInfo,
state : state
}), {signIn})(SinginScreen);
