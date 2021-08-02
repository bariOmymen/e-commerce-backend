import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from './router-helper'

export default function ProtectedRoute({component : Component, ...rest}) {
    const auth = useAuth();
    if(auth.user === true){
        console.log('auth true');
        console.log(auth.user);
    }else{
        console.log(auth.user);
        console.log('nothing');
    }
    return (
       <Route {...rest} render={props => {
           if(auth.user === true){
               return <Component {...props} />
           }
           else{
              return <Redirect to={
                   
                   {
                       pathname : '/signin',
                       state : {
                           from : props.location
                       }
                   }
               } />
            }
            }

       } />
    )
}
