import React from 'react'
import { useSelector } from 'react-redux';
import OrderFail from '../../../components/ecommerce/checkout/CheckoutFail';
import OrderSucess from '../../../components/ecommerce/checkout/CheckoutSuccess';

const Confirmation = () => {  
  const orderConfirmation = useSelector((state) => state.cart.orderConfirmation);

  if(orderConfirmation?.tpc_order_status=="success"){
    return <OrderSucess orderDetails={orderConfirmation}/>
  }else{
    return <OrderFail orderDetails={orderConfirmation}/>
  }
  return (
    <div>{JSON.stringify(orderConfirmation)}</div>
  )
}

export default Confirmation