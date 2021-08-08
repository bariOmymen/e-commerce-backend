import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../actions/userActions';
import { useAuth } from '../router-helper';
import  ErrorBox  from '../components/ErrorBox';
const SinginScreen = ({user,location,history, state}) => {
const auth = useAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const {userInfo, error} = user;
    console.log(error?.message);

    useEffect(() => {
            if( userInfo && !userInfo?.message){
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
                <h1>signIn</h1>
                 {error?.message &&
                  <ErrorBox className='error'>
                     
                     <ErrorBox.Text>{error?.message}</ErrorBox.Text>
                     
                     </ErrorBox>}

              
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
                <label htmlFor="name">Password</label>
                <input value={password} 
                 type="password"
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password">

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

export default connect((state) => ({user : state.user,
state : state
}), {signIn})(SinginScreen);
