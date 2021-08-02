import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {getUserById, updateUserInfo} from '../actions/userActions'

function UserProfileScreen({getUserById, user, updateUserInfo, newInfo, userInfo, ...props}) {
    if(!userInfo){
        props.history.push('/');
    }
   
    var id = userInfo._id;

const {userById, loading, error} = user;

    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [confirmed, setConfirmed] = useState()

    useEffect(() => {
        if(!userById){
            getUserById(id);
        }else{
            setName(userById.name)
            setEmail(userById.email);
        }

    },[getUserById,id, userById, newInfo]);

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmed){
            alert("passwords don't match")
        }else{
            updateUserInfo({_id : userById._id, isAdmin : userById.isAdmin, name, email, password})
           
            //getUserById(id);
        }


    }
    return (
        <div>
            { loading ? 'loading' :
             error ? {error} :
             userById ? 

             <form className='profile-form form' onSubmit={submitHandler}>
             <h3>update your profile</h3>
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
            
           : 'loading...'
}
        </div>
    )
}

export default connect((state) => ({
    user : state.userById, 
    userInfo : state.user.userInfo,
    newInfo : state.userNewDetails.userNewInfo
}),{getUserById, updateUserInfo}) (UserProfileScreen)
