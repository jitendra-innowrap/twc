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
import { createPaymentLink, getAddressList, getCartList, placeOrder, setGst, checkPaymentStatus, checkRentalAvailability } from "../util/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, setBillingAddress, setShippingAddress, updateGst, updateOrderStatus } from "../redux/Slices/cartSlice";
import storage from "../util/localStorage";
import LoginRegister from "../components/ecommerce/LoginRegister";
import { MdClose } from "react-icons/md";
import AddGst from "../components/ecommerce/Dashboard/MyCart/AddGst";
import { generateRandomTransactionId } from "../util/util";


const Cart = () => {
    const router = useRouter();
    const [billingAsDelivery, setBillingAsDelivery] = useState(true)
    const [addressList, setAddressList] = useState([]);
    const [deliveredTo, setDeliveredTo] = useState();
    const [billingTo, setBillingTo] = useState();
    const [gstNumber, setGstNumber] = useState("");
    const [isGST, setIsGST] = useState(false);
    const [errorSetAddressFirst, setErrorSetAddressFirst] = useState(false);
    const [errorNoGst, setErrorNoGst] = useState(false);
    const couponDiscount = useSelector((state) => state.cart.couponCode);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const status = useSelector((state) => state.cart.status);
    const cartCount = useSelector((state) => state.cart.cartCount);
    const cartDetails = useSelector((state) => state.cart.cartDetails);
    const defaultAddress = useSelector((state) => state.cart.defaultAddress);
    const shippingAddress = useSelector((state) => state.cart.shippingAddress);
    const billingAddress = useSelector((state) => state.cart.billingAddress);
    const gst_number = useSelector((state) => state.cart.gst_number);
    const companyName = useSelector((state) => state.cart.companyName);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [unAvailableToDeliver, setUnAvailableToDeliver] = useState(null);


    const handleSelectAddress = (id) => {
        let address = { cart_id: cartItems?.[0]?.cart_id, address_id: id, billing_address_id: billingAddress?.id || defaultAddress?.id };
        dispatch(setShippingAddress(address))
    }
    const handleSelectBilling = (id) => {
        let address = { cart_id: cartItems?.[0]?.cart_id, billing_address_id: id }
        address.address_id = shippingAddress?.id || defaultAddress?.id
        dispatch(setBillingAddress(address))
    }
    const auth_token = storage.get("auth_token");

    const fetchAddressList = async () => {
        try {
            const res = await getAddressList();
            setAddressList(res?.result);
        } catch (error) {
            console.error(error)
        }
    }

    const billingToggle = () => {
        if (!billingAsDelivery && shippingAddress?.id) {
            let address = { cart_id: cartItems?.[0]?.cart_id, billing_address_id: shippingAddress?.id || defaultAddress?.id }
            address.address_id = shippingAddress?.id || defaultAddress?.id
            dispatch(setBillingAddress(address))
        }
        setBillingAsDelivery(!billingAsDelivery)
    }
    const GSTToggle = () => {
        if (isGST && gst_number) {
            handleAddGst();
        }
        setIsGST(!isGST);
        setErrorNoGst(false);

    }

    const handleAddGst = async (gst_number, companyName) => {
        try {
            const res = await setGst({ cart_id: cartItems?.[0]?.cart_id, gst_number, companyName });
            if (res.code == 1) {
                dispatch(updateGst({ gst_number, companyName }));

                toast.success("GST Updated Successfully!", {
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
            } else {
                toast.error("Something Went Wrong!", {
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
            }
        } catch (error) {
            console.error(error)
            toast.error("Something Went Wrong!", {
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
        }
    }

    const handleSaveOrder = async (statusRes) => {
        setIsLoading(true);
        // Generate a transaction type of 1
        const transactionType = 2;

        let body = {
            address_id: shippingAddress?.id,
            billing_address_id: billingAsDelivery ? shippingAddress?.id : billingAddress?.id,
            payment_type: transactionType,
            transaction_id: statusRes?.txn_id,
            order_id: statusRes?.order_id,
            payment_method_type: statusRes?.payment_method_type,
            payment_method_name: statusRes?.payment_method_name
        };
        try {
            const res = await placeOrder(body);
            // Encode the statusRes object as a JSON string for the query parameter
            const encodedStatusRes = encodeURIComponent(JSON.stringify(statusRes));

            if (res.code == 1) {
                router.push(`/order/checkout/confirmation`);
            } else {
                router.push(`/order/checkout/confirmation`);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    const handlePlaceOrder = async () => {
        if (!shippingAddress?.id) {
            setErrorSetAddressFirst(true);
            toast.warn("Please Add Delivery Address!", {
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (isGST && !gst_number) {
            setErrorNoGst(true);
            toast.warn("Please Uncheck Or Add GST Number!", {
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        setIsLoading(true);
        try {
            const response = await checkRentalAvailability({flag:true})
            // const isAvailable = response.data.isAvailable;
            if (response?.code == 1){
                const paymentWindow = window.open('', '_blank', 'width=800,height=600');
                const transactionId = generateRandomTransactionId();
                const transactionType = 1;
                let body = {
                    address_id: shippingAddress?.id,
                    billing_address_id: billingAsDelivery ? shippingAddress?.id : billingAddress?.id,
                    payment_type: 1,
                    transaction_id: transactionId,
                    transaction_type: transactionType,
                };
                try {
                    const res = await createPaymentLink(body);
                    if (res.code === 1) {
                        // Open the payment link in a new popup window
                        paymentWindow.location.href = res.payment_link;
                        // Start polling for payment status
                        startPollingPaymentStatus(res.orderId, paymentWindow);
                    } else {
                        router.push('/checkout-fail');
                    }
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }else{
                console.error(response?.msg)
                setIsLoading(false);
                setUnAvailableToDeliver(response?.unavailable_products)
                toast.error(response?.msg, {
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
            }
        } catch (error) {
            console.error('Error checking rental availability:', error);
            setIsLoading(false);
            toast.error("An error occurred while checking rental availability.", {
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
        }


    };

    // Separate function to handle polling payment status
    const startPollingPaymentStatus = (transactionId, paymentWindow) => {
        const paymentStatusInterval = setInterval(async () => {
            try {
                const statusRes = await checkPaymentStatus(transactionId); // Poll payment status using transactionId
                const encodedStatusRes = encodeURIComponent(JSON.stringify(statusRes));
                // Check for successful payment first
                if (statusRes?.order_status === 'CHARGED') {
                    clearInterval(paymentStatusInterval);  // Stop polling
                    paymentWindow.close();  // Close payment window
                    handleSaveOrder(statusRes);  // Handle successful order
                    dispatch(updateOrderStatus({...statusRes, tpc_order_status:"success"}));
                    return
                } else if (paymentWindow.closed) {
                    clearInterval(paymentStatusInterval);  // Stop polling
                    dispatch(updateOrderStatus({...statusRes, tpc_order_status:"fail"}));
                    setIsLoading(false);  // Stop loading state
                    if (statusRes.order_status === 'AUTHORIZATION_FAILED') {
                        // Show warning toast to inform the user about interrupted payment
                        toast.warn("Payment Refused By The Bank, Please Retry!", {
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
                        return
                    } else if (statusRes.order_status === 'AUTHENTICATION_FAILED') {
                        // Show warning toast to inform the user about interrupted payment
                        toast.warn("Invalid Credentials, Please Retry!", {
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
                        return
                    } else if (statusRes.order_status === 'STARTED') {
                        // Show warning toast to inform the user about interrupted payment
                        toast.warn("Something Went Wrong, Please Retry!", {
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
                        return
                    } else if (statusRes.order_status === 'STARTED') {
                        // Show warning toast to inform the user about interrupted payment
                        toast.warn("Something Went Wrong, Please Retry!", {
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
                        return
                    } else {
                        // Show warning toast to inform the user about interrupted payment
                        toast.warn("Payment process was interrupted!,", {
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
                        router.push(`/order/checkout/confirmation`);
                    }
                }
            } catch (error) {
                clearInterval(paymentStatusInterval);  // Stop polling on error
                paymentWindow.close();  // Close payment window
                setIsLoading(false);  // Stop loading state
                console.error("Error checking payment status:", error);
            }
        }, 2000);
        // Poll every 5 seconds
    };


    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        dispatch(fetchCart());
        fetchAddressList();
        // setDeliveredTo(shippingAddress ? shippingAddress : defaultAddress)
        setDeliveredTo(defaultAddress?.[0]?.id)
        setBillingTo(billingAddress ? billingAddress : defaultAddress);
    }, [])
    useEffect(() => {
        // This effect will run after the first render to update the state
        if (status === 'succeeded') {
          setIsFirstLoad(false); // After the first load, set this to false
        }
      }, [status]); // Run this effect whenever `status` changes
    

    useEffect(() => {
        if (gst_number) {
            setIsGST(true);
        }

    }, [gst_number])


    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Cart">
                <section className="mt-50 mb-50">
                    <div className="container">
                        {
                            isFirstLoad && status !== 'succeeded' ?
                                <div className="loading-view" style={{ height: 'calc( 100vh - 423px)' }}>
                                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                </div>
                                :
                                <div className="">
                                    {!cartItems.length ?
                                        <>
                                            <EmptyCart />
                                        </>
                                        :
                                        <div className="row">
                                            <div className="itemBlock-base-leftBlock pt-0">
                                                <div className="coupons-base-header">Delivery Address</div>
                                                <div className="addressStripV2-base-desktopContainer" style={{ justifyContent: `space-between` }}>
                                                    {
                                                        Object.keys(shippingAddress).length > 0 && <div className="addressStripV2-base-title">
                                                            <div className="addressStripV2-base-addressName">
                                                                Deliver to: <span className="addressStripV2-base-highlight">{`${shippingAddress?.name} , ${shippingAddress?.pincode}`}</span>
                                                            </div>
                                                            <div className="addressStripV2-base-subText">
                                                                {`${shippingAddress?.address_line_1}`} {` , ${shippingAddress?.address_line_2}`}
                                                            </div>
                                                        </div>
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
                                                        lockScroll
                                                        position="right center"
                                                    >
                                                        {
                                                            (close) => (
                                                                <ChangeAddress handleSelectAddress={handleSelectAddress} deliveredTo={shippingAddress?.id} addressList={addressList} fetchAddressList={fetchAddressList} close={close} />
                                                            )
                                                        }
                                                    </Popup>
                                                        :
                                                        <div className="login_popUp">
                                                            <Popup
                                                                trigger={<div>
                                                                    <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop">
                                                                        ADD ADDRESS
                                                                    </div>
                                                                </div>}
                                                                modal
                                                                lockScroll
                                                                position="right center"
                                                            >
                                                                {
                                                                    (close) => (
                                                                        <div className='popUpContainer login'>
                                                                            <button onClick={close} className='close_popUp'>
                                                                                <MdClose fontSize={22} />
                                                                            </button>
                                                                            <LoginRegister noRefferer close={close} />
                                                                        </div>
                                                                    )
                                                                }
                                                            </Popup>
                                                        </div>
                                                    }
                                                </div>
                                                {errorSetAddressFirst && !shippingAddress?.id && <p className="text-danger">Please select a delivery address</p>}
                                                {
                                                    auth_token && <div className="billing_address">
                                                        <hr />
                                                        <div className="billing_address_check d-flex">
                                                            <input type="checkbox" className="cursor_pointer" defaultChecked={billingAsDelivery} onChange={billingToggle} name="billing_address" id="billing_address" />
                                                            <label htmlFor="billing_address" className="mb-0 cursor_pointer"> Billing Address Same as Delivery Address</label>
                                                        </div>
                                                        {!billingAsDelivery && <div className="">
                                                            <div className="coupons-base-header">Billing Address</div>
                                                            <div className="addressStripV2-base-desktopContainer" style={{ justifyContent: `space-between` }}>
                                                                {
                                                                    Object.keys(billingAddress).length > 0 && <div className="addressStripV2-base-title">
                                                                        <div className="addressStripV2-base-addressName">
                                                                            Billing to: <span className="addressStripV2-base-highlight">{`${billingAddress?.name} , ${billingAddress?.pincode}`}</span>

                                                                        </div>
                                                                        <div className="addressStripV2-base-subText">
                                                                            {`${billingAddress?.address_line_1}`} {` ,${billingAddress?.address_line_2}`}
                                                                        </div>
                                                                    </div>
                                                                }
                                                                <Popup
                                                                    trigger={<div>
                                                                        <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop openPopup">
                                                                            {addressList?.length > 0 ? 'CHANGE ADDRESS' : 'ADD ADDRESS'}
                                                                        </div>
                                                                    </div>}
                                                                    modal
                                                                    lockScroll
                                                                    position="right center"
                                                                >
                                                                    {
                                                                        (close) => (
                                                                            <ChangeAddress handleSelectAddress={handleSelectBilling} deliveredTo={billingAddress?.id} addressList={addressList} fetchAddressList={fetchAddressList} close={close} />
                                                                        )
                                                                    }
                                                                </Popup>
                                                            </div>
                                                        </div>}
                                                    </div>
                                                }
                                                <hr className={auth_token && 'mt-0'} />
                                                {
                                                    auth_token && <div className="billing_address gst_number_container">
                                                        <div className="billing_address_check d-flex">
                                                            <input type="checkbox" className="cursor_pointer" defaultChecked={isGST} onChange={GSTToggle} name="gstNumber" id="gstNumber" />
                                                            <label htmlFor="gstNumber" className="mb-0 cursor_pointer"> Do You Have A GST Number.</label>
                                                        </div>
                                                        {isGST && <div className="gst_number_wrapper">
                                                            <div className="">
                                                                {gst_number ? <>
                                                                    <span>{gst_number}</span> <br />
                                                                    <span>{companyName}</span>
                                                                </>
                                                                    : 'Add'}
                                                            </div>
                                                            <Popup
                                                                trigger={
                                                                    <div>
                                                                        {
                                                                            gst_number ?
                                                                                <i className="fi-rs-pencil cursor_pointer"></i> :
                                                                                <i className="fi-rs-plus cursor_pointer"></i>
                                                                        }
                                                                    </div>
                                                                }
                                                                modal
                                                                lockScroll
                                                                position="right center"
                                                            >
                                                                {
                                                                    (close) => (
                                                                        <AddGst handleAddGst={handleAddGst} gstNumber={gst_number} companyName={companyName} close={close} />
                                                                    )
                                                                }
                                                            </Popup>
                                                        </div>}
                                                    </div>
                                                }
                                                {errorNoGst && <p className="text-danger">Please Add A GST Number</p>}

                                                <div id="cartItemsList">
                                                    {
                                                        cartItems.map((item) => {
                                                            return <CartItem unAvailableToDeliver={unAvailableToDeliver} item={item} key={item?.product_id} />
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
                                                            <span className>MRP</span>
                                                            <span className="priceDetail-base-value">
                                                                <span />
                                                                <span> <span className>₹</span>{(cartDetails?.mrp)}</span>
                                                            </span>
                                                        </div>
                                                        <div className="priceDetail-base-row">
                                                            <span className>Our Price</span>
                                                            <span className="priceDetail-base-value">
                                                                <span />
                                                                <span> <span className>₹</span>{(cartDetails?.items_total)}</span>
                                                            </span>
                                                        </div>
                                                        {couponDiscount && <div className="priceDetail-base-row">
                                                            <span className>Coupon Discount</span>
                                                            <span className="priceDetail-base-value priceDetail-base-discount">
                                                                <span>-</span>
                                                                <span> <span className>₹</span>{(cartDetails?.total_coupon_discount)}</span>
                                                            </span>
                                                        </div>}
                                                        <div className="priceDetail-base-row">
                                                            <span className>Sub Total</span>
                                                            <span className="priceDetail-base-value">
                                                                <span />
                                                                <span> <span className>₹</span>{(cartDetails?.sub_total)}</span>
                                                            </span>
                                                        </div>
                                                        <div className="priceDetail-base-row">
                                                            <span className>Taxes (18%)</span>
                                                            <span className="priceDetail-base-value">
                                                                <span />
                                                                <span> <span className>₹</span>{(cartDetails?.tax_amount)}</span>
                                                            </span>
                                                        </div>
                                                        <div className="priceDetail-base-row">
                                                            <span className>Amount To Be Paid</span>
                                                            <span className="priceDetail-base-value">
                                                                <span />
                                                                <span> <span className>₹</span>{(cartDetails?.amount_to_be_paid)}</span>
                                                            </span>
                                                        </div>
                                                        <div className="priceDetail-base-row">
                                                            <span className>Deposit</span>
                                                            <span className="priceDetail-base-value">
                                                                <span />
                                                                <span> <span className>₹</span>{(cartDetails?.deposit_amount)}</span>
                                                            </span>
                                                        </div>
                                                        <div className="priceDetail-base-total">
                                                            <span className>Final Price</span>
                                                            <span className="priceDetail-base-value">
                                                                <span />
                                                                <span> <span className="priceDetail-base-redesignRupeeTotalIcon">₹</span> {(cartDetails?.total_payable)}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {auth_token ?
                                                        <button width="100%" onClick={handlePlaceOrder} disabled={isLoading} letterspacing="1px" fontWeight="bold" role="button" className="css-ibwr57">
                                                            <div className="css-xjhrni">{isLoading ?
                                                                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                                                : 'PLACE ORDER'}</div>
                                                        </button>
                                                        :
                                                        <Popup
                                                            trigger={<button width="100%" letterSpacing="1px" fontWeight="bold" role="button" className="css-ibwr57">
                                                                <div className="css-xjhrni">PLACE ORDER</div>
                                                            </button>}
                                                            modal
                                                            lockScroll
                                                            position="right center"
                                                        >
                                                            {
                                                                (close) => (
                                                                    <div className='popUpContainer login'>
                                                                        <button onClick={close} className='close_popUp'>
                                                                            <MdClose fontSize={22} />
                                                                        </button>
                                                                        <LoginRegister noRefferer close={close} />
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
                        }
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Cart;
