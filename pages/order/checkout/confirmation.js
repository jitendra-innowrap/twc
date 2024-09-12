import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OrderFail from '../../../components/ecommerce/checkout/CheckoutFail';
import OrderSucess from '../../../components/ecommerce/checkout/CheckoutSuccess';
import { fetchCart } from '../../../redux/Slices/cartSlice';

const Confirmation = () => {  
  const orderConfirmation = useSelector((state) => state.cart.orderConfirmation);
  const dispatch = useDispatch();
  if(orderConfirmation?.tpc_order_status=="success"){
    dispatch(fetchCart());
    return <OrderSucess orderDetails={orderConfirmation}/>
  }else{
    return <OrderFail orderDetails={orderConfirmation}/>
  }
}

export default Confirmation