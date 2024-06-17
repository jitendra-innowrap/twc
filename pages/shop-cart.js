import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
const dummyAddresses = [
    {
      id: "1",
      name: "John Doe",
      mobile: "1234567890",
      addressLine1: "3522 Interstate",
      addressLine2: "75 Business Spur",
      landmark: "Sault Ste. Marie",
      pincode: "49783",
      state: "MI",
      city: "Sault Ste. Marie",
      addressType: "home",
      isDefault: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      mobile: "2345678901",
      addressLine1: "123 Main St",
      addressLine2: "Anytown, USA",
      landmark: "Corner of Main and Elm",
      pincode: "12345",
      state: "CA",
      city: "Anytown",
      addressType: "office",
      isDefault: false,
    },
    {
      id: "3",
      name: "Bob Johnson",
      mobile: "3456789012",
      addressLine1: "456 Elm St",
      addressLine2: "Othertown, USA",
      landmark: "Elm and Oak",
      pincode: "67890",
      state: "NY",
      city: "Othertown",
      addressType: "home",
      isDefault: false,
    },
    {
      id: "4",
      name: "Alice Brown",
      mobile: "4567890123",
      addressLine1: "789 Oak St",
      addressLine2: "Thistown, USA",
      landmark: "Oak and Maple",
      pincode: "34567",
      state: "TX",
      city: "Thistown",
      addressType: "office",
      isDefault: false,
    },
    {
      id: "5",
      name: "Charlie Davis",
      mobile: "5678901234",
      addressLine1: "901 Maple St",
      addressLine2: "Thattown, USA",
      landmark: "Maple and Pine",
      pincode: "90123",
      state: "FL",
      city: "Thattown",
      addressType: "home",
      isDefault: false,
    },
];
import Link from "next/link";
import React, { useState } from 'react'
import { clearCart, closeCart, decreaseQuantity, deleteFromCart, increaseQuantity, openCart } from "../redux/action/cart";
import { Bounce, toast } from "react-toastify";
import { addToWishlist } from "../redux/action/wishlistAction";
import { useRouter } from "next/router";
import EmptyCart from "../components/ecommerce/Dashboard/MyCart/EmptyCart";
import CartItem from "../components/ecommerce/Dashboard/MyCart/CartItem";
import ApplyCoupons from "../components/ecommerce/Dashboard/MyCart/ApplyCoupon";
import Popup from "reactjs-popup";
import ChangeAddress from "../components/ecommerce/Dashboard/MyCart/ChangeAddress";
import { useSyncExternalStore } from "react";
import { useEffect } from "react";


const Cart = ({ openCart, addToWishlist, cartItems, activeCart, closeCart, increaseQuantity, decreaseQuantity, deleteFromCart, clearCart }) => {
    const [addressList, setAddressList] = useState(dummyAddresses);
    const [deliveredTo, setDeliveredTo] = useState("1");
    const [priceDetails, setPriceDetails] = useState({
        totalMrp:"",
        totalPrice:"",
        totalDiscount:"",
        totalDeposit:"",
        SumTotal:""
    })
    
    const handleSelectAddress = (id) =>{
        setDeliveredTo(id)
    }
    const cartTotal = () => {
        const priceDetails = { totalPrice: 0, totalDeposit: 0, totalDiscount: 0 };
        cartItems.forEach((item) => {
            if (item.type === "rent") {
                priceDetails.totalMrp += item.oldPrice;
                priceDetails.totalPrice += item.price;
                priceDetails.totalDeposit += item.price;
                priceDetails.totalDiscount += item.oldPrice - item.price;
            } else {
                priceDetails.totalMrp += item.oldPrice;
                priceDetails.totalPrice += item.price;
                priceDetails.totalDiscount += item.oldPrice - item.price;
            }
        });
        setPriceDetails(priceDetails);
    };
    const router = useRouter()

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast.success("Add to Wishlist !", {
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


    useEffect(() => {
      
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
                                            addressList.filter((address) => address.id === deliveredTo).map((address) => (
                                                <div className="addressStripV2-base-title">
                                                <div className="addressStripV2-base-addressName">
                                                    Deliver to: <span className="addressStripV2-base-highlight">{address.name}</span>,
                                                    <div className="addressStripV2-base-highlight">{address.pincode}</div>
                                                </div>
                                                <div className="addressStripV2-base-subText">
                                                    {`${address.addressLine1}, ${address.addressLine2}`}
                                                </div>
                                                </div>
                                            ))
                                            }
                                            <Popup
                                                trigger={
                                                    <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop">
                                                        CHANGE ADDRESS
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
                                                        <span> <span className>₹</span>{priceDetails.totalMrp}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Total Deposit</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{priceDetails.totalDeposit}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Discount on MRP</span>
                                                    <span className="priceDetail-base-value priceDetail-base-discount">
                                                        <span>-</span>
                                                        <span> <span className>₹</span>{priceDetails.totalDiscount}</span>
                                                    </span>
                                                </div>
                                                {/* <div className="priceDetail-base-row">
                                                    <span>Coupon Discount</span>
                                                    <span className="priceDetail-base-value priceDetail-base-action">Apply Coupon</span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Platform Fee<span className="priceDetail-base-knowMore">Know More</span></span>
                                                    <span className="priceDetail-base-value">₹<span className>20</span></span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span>Shipping Fee
                                                        <div className="priceDetail-base-infoTextContainer">
                                                            <button fontWeight="bold" role="button" className="css-1pl9bms">
                                                                <div className="css-xjhrni">Know More</div>
                                                            </button>
                                                        </div>
                                                    </span>
                                                    <span className="priceDetail-base-value">₹<span className>79</span></span>
                                                    <div className="priceDetail-base-convenienceCalloutText">
                                                        Add items worth <span style={{ fontWeight: 'bold', color: '#03A685' }}>₹667</span> to get free shipping
                                                    </div>
                                                </div> */}
                                                <div className="priceDetail-base-total">
                                                    <span className>Total Amount</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className="priceDetail-base-redesignRupeeTotalIcon">₹</span>{priceDetails.totalPrice}</span>
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

const mapStateToProps = (state) => ({
    cartItems: state.cart,
    activeCart: state.counter
});

const mapDispatchToProps = {
    closeCart,
    increaseQuantity,
    addToWishlist,
    decreaseQuantity,
    deleteFromCart,
    openCart,
    clearCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
