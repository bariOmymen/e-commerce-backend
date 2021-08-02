import React ,{useEffect}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderHistory} from "../actions/orderActions"

function OrderHistory({...props}) {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOrderHistory())
        
    },[dispatch])
   
   
    
    const orderHistory = useSelector((state) => state.orderHistory);
    const {error, history} = orderHistory

    return (
      
        <table className='history-content'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
               
              {
                history === undefined ? <strong>loading...</strong>
                    : error ? <strong>{error}</strong> : (
                        history.map((order) => (
                            
                       <tr >
                       <th>{order._id}</th>
                       <th>12:44</th>
                       <th>{order.totalPrice}</th>
                       <th>{order.isPaid ? "PAID" : "NOT PAID"}</th>
                       <th>{order.isDelivered  ? "DELIVERED" : "NOT DELIVERED"}</th>
                      <th>
                          <button>Details</button>
                          
                      </th>
   
                       </tr>
                       
                    )))
            }
           
            </tbody>
        </table>
    )
}

export default  OrderHistory
/* connect((state) => ({orderHistory : state.history}), {getOrderHistory})

  {loading ? <strong>loading...</strong>
                 : error ? <strong>{error}</strong> : (history.map((order) => (
                    <tr>
                    <th>{order._id}</th>
                    <th>12:44</th>
                    <th>{order.totalPrice}</th>
                    <th>{order.isPaid}</th>
                    <th>{order.isDelivered}</th>
                   <button>
                       Details
                   </button>

                    </tr>
                 )))


*/