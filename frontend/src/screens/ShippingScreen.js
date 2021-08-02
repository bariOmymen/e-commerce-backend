import React, { useState } from 'react'
import {connect} from 'react-redux'


import ChexkoutFlow from '../components/ChexkoutFlow'
import {saveShippingDetails} from '../actions/cartActins'

function ShippingScreen({shippingDetails, saveShippingDetails, userInfo, ...props}) {
    if(!userInfo) { 
props.history.push('/signin');
    }

    const [fullName, setFullName] = useState(shippingDetails.fullName)
    const [address, setAddress] = useState(shippingDetails.address)
    const [city, setCity] = useState(shippingDetails.city)
    const [postalCode, setPostalCode] = useState(shippingDetails.postalCode)
    const [country, setCountry] = useState(shippingDetails.country)
    

    const submitHandler = (e) => {
      e.preventDefault();
      saveShippingDetails({fullName,address,city,postalCode,country});
      props.history.push('/payment');
    }
    return (
        <div className="shipping-details">
            <ChexkoutFlow step1 step2></ChexkoutFlow>
            
        <form className="shipping-form form" onSubmit={submitHandler}>

            <h3>Shipping details</h3>
<div>
                <label htmlFor="fullname">Full Name</label>
                <input value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="Full Name"
                type="text">

                </input>
                </div>
<div>
                <label htmlFor="address">Address</label>
                <input value={address} 
                 type="text"
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="address">

                </input>
                </div>
<div>
                <label htmlFor="City">City</label>
                <input value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="City">

                </input>
                </div>
<div>
                <label htmlFor="postal-code">postal code</label>
                <input value={postalCode} 
                 type="text"
                onChange={(e) => setPostalCode(e.target.value)} 
                placeholder="postal code">

                </input>
                </div>
<div>
                <label htmlFor="Country">Country</label>
                <input value={country} 
                 type="text"
                onChange={(e) => setCountry(e.target.value)} 
                placeholder="Country">

                </input>
                </div>
                <div>
                    <input className='button' type='submit' value="continue" />
                </div>
            </form>
            
        </div>
    )
}

export default connect((state) => ({
    shippingDetails : state.userDetails.shipping, 
    userInfo : state.user.userInfo,
}),{saveShippingDetails})(ShippingScreen)
