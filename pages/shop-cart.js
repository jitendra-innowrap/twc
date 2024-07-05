import Layout from "../components/layout/Layout";
import Link from "next/link";
import React, { useState } from 'react'
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/router";
import EmptyCart from "../components/ecommerce/Dashboard/MyCart/EmptyCart";
import CartItem from "../components/ecommerce/Dashboard/MyCart/CartItem";
import ApplyCoupons from "../components/ecommerce/Dashboard/MyCart/ApplyCoupon";
import Popup from "reactjs-popup";
import ChangeAddress from "../components/ecommerce/Dashboard/MyCart/ChangeAddress";
import { useEffect } from "react";
import { getAddressList, getCartList } from "../util/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/Slices/cartSlice";
import storage from "../util/localStorage";
import LoginRegister from "../components/ecommerce/LoginRegister";
import { MdClose } from "react-icons/md";


const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartCount = useSelector((state) => state.cart.cartCount);
    const cartDetails = useSelector((state) => state.cart.cartDetails);
    const [billingAsDelivery, setBillingAsDelivery] = useState(true)
    const [addressList, setAddressList] = useState([]);
    const [deliveredTo, setDeliveredTo] = useState();
    const [billingTo, setBillingTo] = useState();

    const dispatch = useDispatch();

    const handleSelectAddress = (id) => {
        setDeliveredTo(id)
    }
    const handleSelectBilling = (id) => {
        setBillingTo(id)
    }
    const auth_token = storage.get("auth_token");
    const fetchAddressList = async () => {
        try {
            const res = await getAddressList();
            setAddressList(res?.result);
            let defaultAddress = res.result.find(address => address.is_default == 1);
            setDeliveredTo(defaultAddress ? defaultAddress.id : res?.result?.[0].id)
            setBillingTo(defaultAddress ? defaultAddress.id : res?.result?.[0].id)
            console.log('cart address', res)
        } catch (error) {
            console.log(error)
        }
    }
    const billingToggle =()=>{
        setBillingAsDelivery(!billingAsDelivery)

    }
    useEffect(() => {
        dispatch(fetchCart());
        fetchAddressList();
    }, [])

    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Cart">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="">
                            {!cartItems.length ?
                                <>
                                    <EmptyCart />
                                </>
                                :
                                <div className="row">
                                    <div className="itemBlock-base-leftBlock pt-0">
                                        <div className="coupons-base-header">Delivery Address</div>
                                        <div className="addressStripV2-base-desktopContainer" style={{ justifyContent: `${addressList?.length > 0 ? '' : 'end'}` }}>
                                            {
                                                addressList?.filter((address) => address.id == deliveredTo).map((address) => (
                                                    <div className="addressStripV2-base-title">
                                                        <div className="addressStripV2-base-addressName">
                                                            Deliver to: <span className="addressStripV2-base-highlight">{address.name}</span>,
                                                            <div className="addressStripV2-base-highlight"> {address.pincode}</div>
                                                        </div>
                                                        <div className="addressStripV2-base-subText">
                                                            {`${address.address_line_1 || address?.addressLine1}, ${address.address_line_2 || address?.addressLine2}`}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            {auth_token ? <Popup
                                                trigger={<div>
                                                    <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop openPopup">
                                                        {addressList?.length > 0 ? 'CHANGE ADDRESS' : 'ADD ADDRESS'}
                                                    </div>
                                                    <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop openPopup mobile">
                                                        CHANGE
                                                    </div>
                                                </div>}
                                                modal
                                                position="right center"
                                            >
                                                {
                                                    (close) => (
                                                        <ChangeAddress handleSelectAddress={handleSelectAddress} deliveredTo={deliveredTo} addressList={addressList} setAddressList={setAddressList} close={close} />
                                                    )
                                                }
                                            </Popup>
                                                :
                                                <div className="login_popUp">
                                                    <Popup
                                                        trigger={<div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop openPopup">
                                                            {addressList?.length > 0 ? 'CHANGE ADDRESS' : 'ADD ADDRESS'}
                                                        </div>}
                                                        modal
                                                        position="right center"
                                                    >
                                                        {
                                                            (close) => (
                                                                <div className='popUpContainer login'>
                                                                    <button onClick={close} className='close_popUp'>
                                                                        <MdClose fontSize={22} />
                                                                    </button>
                                                                    <LoginRegister close={close} />
                                                                </div>
                                                            )
                                                        }
                                                    </Popup>
                                                </div>
                                            }
                                        </div>
                                        {
                                            auth_token && <div className="billing_address">
                                                <hr />
                                                <div className="billing_address_check d-flex">
                                                    <input type="checkbox" checked={!billingAsDelivery} onClick={billingToggle} name="billing_address" id="billing_address" />
                                                    <label htmlFor="billing_address" className="mb-0"> Billing Address Same as Delivery Address</label>
                                                </div>
                                                {billingAsDelivery && <div className="">
                                                    <div className="coupons-base-header">Billing Address</div>
                                                    <div className="addressStripV2-base-desktopContainer" style={{ justifyContent: `${addressList?.length > 0 ? '' : 'end'}` }}>
                                                        {
                                                            addressList?.filter((address) => address.id == billingTo).map((address) => (
                                                                <div className="addressStripV2-base-title">
                                                                    <div className="addressStripV2-base-addressName">
                                                                        Billing to: <span className="addressStripV2-base-highlight">{address.name}</span>,
                                                                        <div className="addressStripV2-base-highlight"> {address.pincode}</div>
                                                                    </div>
                                                                    <div className="addressStripV2-base-subText">
                                                                        {`${address.address_line_1 || address?.addressLine1}, ${address.address_line_2 || address?.addressLine2}`}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        <Popup
                                                            trigger={<div>
                                                                <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop openPopup">
                                                                    {addressList?.length > 0 ? 'CHANGE ADDRESS' : 'ADD ADDRESS'}
                                                                </div>
                                                                <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop openPopup mobile">
                                                                    CHANGE
                                                                </div>
                                                            </div>}
                                                            modal
                                                            position="right center"
                                                        >
                                                            {
                                                                (close) => (
                                                                    <ChangeAddress handleSelectAddress={handleSelectBilling} deliveredTo={billingTo} addressList={addressList} setAddressList={setAddressList} close={close} />
                                                                )
                                                            }
                                                        </Popup>
                                                    </div>
                                                </div>}
                                            </div>
                                        }
                                        <div id="cartItemsList">
                                            {
                                                cartItems.map((item) => {
                                                    return <CartItem item={item} key={item?.product_id} />
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="itemBlock-base-rightBlock pt-0">
                                        <ApplyCoupons />
                                        <div className="priceBlock-base-container">
                                            <div className="priceBlock-base-priceHeader">PRICE DETAILS ({cartCount} Item)</div>
                                            <div className="priceBreakUp-base-orderSummary" id="priceBlock">
                                                <div className="priceDetail-base-row" >
                                                    <span className>Total MRP</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(cartDetails?.mrp)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Discount on MRP</span>
                                                    <span className="priceDetail-base-value priceDetail-base-discount">
                                                        <span>-</span>
                                                        <span> <span className>₹</span>{(cartDetails.dicount_on_mrp)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Total Price</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(cartDetails.items_total)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Refundable Deposit</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(cartDetails.deposit_amount)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-total">
                                                    <span className>Total Amount</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className="priceDetail-base-redesignRupeeTotalIcon">₹</span> {(cartDetails.total_payable)}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {auth_token ? <Link href={'/checkout-success'}>
                                                <button width="100%" letterspacing="1px" fontWeight="bold" role="button" className="css-ibwr57">
                                                    <div className="css-xjhrni">PLACE ORDER</div>
                                                </button>
                                            </Link>:
                                                <Popup
                                                trigger={<button width="100%" letterspacing="1px" fontWeight="bold" role="button" className="css-ibwr57">
                                                    <div className="css-xjhrni">PLACE ORDER</div>
                                                </button>}
                                                modal
                                                position="right center"
                                            >
                                                {
                                                    (close) => (
                                                        <div className='popUpContainer login'>
                                                            <button onClick={close} className='close_popUp'>
                                                                <MdClose fontSize={22} />
                                                            </button>
                                                            <LoginRegister close={close} />
                                                        </div>
                                                    )
                                                }
                                            </Popup>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Cart;
