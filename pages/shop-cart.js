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


const Cart = ({cartItems=[]}) => {
    const [addressList, setAddressList] = useState([]);
    const [deliveredTo, setDeliveredTo] = useState();
    const [priceDetails, setPriceDetails] = useState({
        totalMrp:0,
        totalPrice:0,
        totalDiscount:0,
        totalDeposit:0,
    })
    
    const handleSelectAddress = (id) =>{
        setDeliveredTo(id)
    }
    const cartTotal = () => {
        const priceDetails = { totalPrice: 0, totalDeposit: 0, totalDiscount: 0, totalMrp: 0 };
        cartItems.forEach((item) => {
            const oldPrice = item.mrp || 0;
            const price = item.selling_price || 0;
            const quantity = item.quantity || 0;
            const deposit = item?.deposit_amount || 0;
            if (item.product_type=="1") {
                priceDetails.totalMrp += oldPrice * quantity;
                priceDetails.totalPrice += price * quantity;
                priceDetails.totalDeposit += deposit * quantity;
                priceDetails.totalDiscount += (oldPrice - price) * quantity;
            } else {
                priceDetails.totalMrp += oldPrice * quantity;
                priceDetails.totalPrice += price * quantity;
                priceDetails.totalDiscount += (oldPrice - price) * quantity;
            }
        });
        
        setPriceDetails(priceDetails);
    };
    const router = useRouter()

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast.success("Added to Wishlist !", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const fetchCartList = async ()=>{
        try {
            const res = await getCartList();
            console.log(res)
        } catch (error) {
            
        }
    }
    const fetchAddressList = async () =>{
        try {
            const res = await getAddressList();
            setAddressList(res?.result);
            let defaultAddress = res.result.find(address=> address.is_default == 1);
            setDeliveredTo(defaultAddress.id)
            console.log('cart address',res)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchCartList();
        fetchAddressList();
        cartTotal();
    }, [cartItems])
    
    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Cart">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="">
                            {cartItems.length <= 0 ?
                                <EmptyCart />
                                :
                                <div className="row">
                                    <div className="itemBlock-base-leftBlock">
                                        <div className="addressStripV2-base-desktopContainer">
                                        {
                                            addressList?.filter((address) => address.is_default==1).map((address) => (
                                                <div className="addressStripV2-base-title">
                                                <div className="addressStripV2-base-addressName">
                                                    Deliver to: <span className="addressStripV2-base-highlight">{address.name}</span>,
                                                    <div className="addressStripV2-base-highlight"> {address.pincode}</div>
                                                </div>
                                                <div className="addressStripV2-base-subText">
                                                    {`${address.address_line_1}, ${address.address_line_2}`}
                                                </div>
                                                </div>
                                            ))
                                            }
                                            <Popup
                                                trigger={<div>
                                                    <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop openPopup">
                                                        CHANGE ADDRESS
                                                    </div>
                                                    <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop openPopup mobile">
                                                        CHANGE
                                                    </div>
                                                </div>} 
                                                modal 
                                                position="right center"
                                                >
                                                    {
                                                        (close)=>(
                                                            <ChangeAddress handleSelectAddress={handleSelectAddress} deliveredTo={deliveredTo} addressList={addressList} setAddressList={setAddressList} close={close} />
                                                        )
                                                    }
                                            </Popup>
                                        </div>
                                        <div id="cartItemsList">
                                            {
                                                cartItems.map((item, idx)=>{
                                                    return <CartItem item={item} deleteFromCart={deleteFromCart} />
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="itemBlock-base-rightBlock">
                                        <ApplyCoupons/>
                                        <div className="priceBlock-base-container">
                                            <div className="priceBlock-base-priceHeader">PRICE DETAILS ({cartItems.length} Item)</div>
                                            <div className="priceBreakUp-base-orderSummary" id="priceBlock">
                                                <div className="priceDetail-base-row" >
                                                    <span className>Total MRP</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(priceDetails.totalMrp).toFixed(2)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Discount on MRP</span>
                                                    <span className="priceDetail-base-value priceDetail-base-discount">
                                                        <span>-</span>
                                                        <span> <span className>₹</span>{(priceDetails.totalDiscount).toFixed(2)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Total Price</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(priceDetails.totalPrice).toFixed(2)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Refundable Deposit</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(priceDetails.totalDeposit).toFixed(2)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-total">
                                                    <span className>Total Amount</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className="priceDetail-base-redesignRupeeTotalIcon">₹</span> {(priceDetails.totalPrice + priceDetails.totalDeposit).toFixed(2)}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href={'/checkout-success'}>
                                                <button width="100%" letterspacing="1px" fontWeight="bold" role="button" className="css-ibwr57">
                                                    <div className="css-xjhrni">PLACE ORDER</div>
                                                </button>
                                            </Link>
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
