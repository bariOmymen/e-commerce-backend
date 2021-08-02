import React, { useState } from 'react'
import { connect } from 'react-redux';
import ChexkoutFlow from '../components/ChexkoutFlow'
import {savePaymentMethod} from '../actions/cartActins'

function PaymentScreen({userInfo, savePaymentMethod, ...props}) {
    if(!userInfo){
props.history.push("/signin");
    }
    const [payment, setPayment] = useState('Paypal');
    const submitHandler = (e) => {
e.preventDefault();
savePaymentMethod(payment);
if(!payment){
    alert('must')
}
props.history.push('/placeOrder');
    }
    return (
        <div>
            <ChexkoutFlow step1 step2 step3 />
            <form className='card payment-form' onSubmit={submitHandler}>
<div>
    <input type="radio" required checked id="paypal" name="favorit-payment" value="Paypal" onChange={(e) => setPayment(e.target.payment)} />
    <label for="Paypal">Paypal</label><br />
    <input type="radio" required id="Stripe" name="favorit-payment" value="Stripe" onChange={(e) => setPayment(e.target.payment)} />
    <label for="Stripe">Stripe</label>
</div>

<input className='button ' type="submit" value="continue" />
            </form>
        </div>
    )
 
}
export default connect((state) => ({
    userInfo : state.user.userInfo,
}),{savePaymentMethod})(PaymentScreen)


