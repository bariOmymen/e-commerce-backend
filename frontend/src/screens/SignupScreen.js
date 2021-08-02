import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../actions/userActions';
import { useAuth } from '../router-helper';


const SignupScreen = ({userInfo,signUp,location,history}) => {
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [confirmed, setConfirmed] = useState()
    const auth = useAuth();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
if(userInfo){
history.push(redirect);
}
    })
    const submitHandler = (e) => {
e.preventDefault();
if(password===confirmed){
auth.signUp(name,email,password)
}else{
    alert("passwords don't match");
}



    }
    return (
        <div className='signup'>
            <div className='container'>
              <form className='signup-form form' onSubmit={submitHandler}>
              <h3>Enter your details</h3>
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
                <input value={name} 
                 type="text"
                onChange={(e) => setName(e.target.value)} 
                placeholder="Name">

                </input>
                </div>
<div>
                <label htmlFor="password">Password</label>
                <input value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="password"
                type='password'
                >
                    
                </input>
                </div>
<div>
                <label htmlFor="confirmation">confirmation</label>
                <input value={confirmed} 
                 type="password"
                onChange={(e) => setConfirmed(e.target.value)} 
                placeholder="confirmation">

                </input>
                </div>
                <div>
                    <input className='button submit-Button' type='submit' value="continue" />
                </div>
            </form>
            </div>
        </div>
    )
}

export default connect((state) => ({userInfo : state.user.userInfo}),{signUp}) (SignupScreen)
/* <label>Enter Email</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} ></input>
                <label>Enter Name</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required={true} ></input>
                <label>Enter Password</label>
                <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} required={true} ></input>
                <label>confirm password</label>
                <input type='text' value={confirmed} onChange={(e) => setConfirmed(e.target.value)} required={true} ></input>
                <input type='submit' value='Signup' className='submit-Button'></input>*/