import Layout from "../../components/layout/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import storage from "../../util/localStorage";
import { useDispatch } from "react-redux";
import { downloadInvoice, getOrderDetails } from "../../util/api";
import { Bounce, toast } from "react-toastify";
import CartItem from "../../components/ecommerce/Dashboard/MyCart/CartItem";
import Link from "next/link";
import { priceOffPercentage, reverseDateOrder } from "../../util/util";
function Account() {
    const router = useRouter();
    const auth_token = storage.get("auth_token");
    const [orderDetail, setOrderDetail] = useState([])
    const { orderId } = router.query;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!auth_token){
            router.push('/page-login-register')
        }
        fetchOrderDetail();
    }, [router.query])
    
    const fetchOrderDetail = async () =>{
        setLoading(true)
        try {
            const res = await getOrderDetails(orderId);
            if(res?.code==1){
                setOrderDetail(res)
            }
            console.log(res)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
            
        }
    }

    const handleDownloadInvoice = async()=>{
        try {
            let res = downloadInvoice(orderId);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {<Layout parent="Home" sub="My Orders" subChild={`Order Detail`}>
                <section className="pt-70 pb-150 order-detail">
                    <div className="container">
                        {loading?
                        <div className="">Loading...</div>
                        :<div className="row">
                        <div className="">
                            <div className="row">
                                <div className="coupons-base-header col-12 col-md-6 col-lg-4">Order ID : {orderId}</div>
                                {orderDetail?.bill_details?.gst_number && <div className="coupons-base-header col-12 col-md-6 col-lg-4 text-right">Gst Number : {orderDetail?.bill_details?.gst_number}</div>}
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4 mb-40">
                                    <div className="order-address">
                                        <div className={`card-body border mb-0 address d-block`} >
                                            <div className="card-head mb-10">
                                                <div className="name">Delivery Address</div>
                                            </div>
                                            <address>
                                                <div className="name fw-bold">{orderDetail?.shipping_address?.name} </div>
                                                {orderDetail?.shipping_address?.address_line_1}<br />
                                                {orderDetail?.shipping_address?.address_line_2 && <>{orderDetail?.shipping_address?.address_line_2}<br /></> }
                                                {`${orderDetail?.shipping_address?.city}, ${orderDetail?.shipping_address?.state_name} - ${orderDetail?.shipping_address?.pincode}`}<br />
                                                {orderDetail?.shipping_address?.landmark && <>{orderDetail?.shipping_address?.landmark}<br /></> }
                                                <div className="tel"><span className="fw-bold">Phone:</span> {orderDetail?.shipping_address?.mobile}</div>
                                            </address>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 mb-40">
                                    <div className="order-address">
                                        <div className={`card-body border mb-0 address d-block`} >
                                            <div className="card-head mb-10">
                                                <div className="name">Billing Address</div>
                                            </div>
                                            <address>
                                            <div className="name fw-bold">{orderDetail?.billing_address?.name} </div>
                                                {orderDetail?.billing_address?.address_line_1}<br />
                                                {orderDetail?.billing_address?.address_line_2 && <>{orderDetail?.billing_address?.address_line_2}<br /></> }
                                                {`${orderDetail?.billing_address?.city}, ${orderDetail?.billing_address?.state_name} - ${orderDetail?.billing_address?.pincode}`}<br />
                                                {orderDetail?.billing_address?.landmark && <>{orderDetail?.billing_address?.landmark}<br /></> }
                                                <div className="tel"><span className="fw-bold">Phone:</span> {orderDetail?.billing_address?.mobile}</div>
                                            </address>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 mb-40">
                                    <div className="order-address h-100">
                                    <div className="card-head mb-10">
                                    {orderDetail?.bill_details?.gst_number && <div className="coupons-base-header text-right mb-0">Gst NO : {orderDetail?.bill_details?.gst_number}</div>}
                                    {orderDetail?.bill_details?.company_name && <div className="coupons-base-header text-right">Company Name : {orderDetail?.bill_details?.company_name}</div>}
                                            </div>
                                        <div className={`  mb-0 address d-block h-100`}>
                                            <div className="d-flex justify-content-between">
                                                <a onClick={handleDownloadInvoice} target="_blank" style={{color:'#fff'}}>
                                                    <button className="btn">
                                                        Download Invoice
                                                    </button></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="cartItemsList itemBlock-base-leftBlock col-12 col-md-6 pt-0">
                                                {
                                                    orderDetail?.order_data?.map((item) => {
                                                        return <div className="itemContainer-base-itemMargin">
                                                            <div className="item-base-item">
                                                            <div className="itemContainer-base-item">
                                                                <div className="itemContainer-base-itemLeft">
                                                                    <Link href={`/products/detail/${item.handle}`}>
                                                                        <div className style={{ background: 'rgb(255, 237, 243)', height: 148, width: 111 }}>
                                                                            <picture className="image-base-imgResponsive" style={{ width: '100%' }}>
                                                                                <img src={item.product_image} 
                                                                                className="image-base-imgResponsive" alt={item?.name} fetchpriority="high" loading="eager" style={{ height: 148, width: 111, objectFit:"cover", objectPosition:'top' }} /></picture>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                                <div className="itemContainer-base-itemRight">
                                                                    <div className="itemContainer-base-details">
                                                                        <div>
                                                                            <div className="itemContainer-base-brand">{item.category_name}</div>
                                                                            <Link className="itemContainer-base-itemLink" href={`/products/detail/${item.handle}`}>
                                                                                <a>
                                                                                {`${item.product_name}`}
                                                                                {(item.option_value_1 && item.product_type =='1')? ` - ${item.option_value_1}`: ''}
                                                                                {(item.color && item.product_type =='1')? ` , ${item.color}`: ''}
                                                                                </a>
                                                                            </Link>
                                                                        </div>
                                                                        <div className="itemComponents-base-sellerContainer">
                                                                            <div className="itemComponents-base-sellerData">
                                                                            {
                                                                                item.product_type == "2" ?
                                                                                    <>
                                                                                        <p className="font-xs">
                                                                                            <span>Event Date:</span> {reverseDateOrder(item.rental_start_date)}
                                                                                        </p>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                    <p className="font-xs from-to-date">
                                                                                        <span>From: </span> {reverseDateOrder(item.rental_start_date)}
                                                                                        <span> - To: </span>{reverseDateOrder(item.rental_end_date)}
                                                                                    </p>
                                                                                    <p className="font-xs from-to-date-mobile">
                                                                                        <span>From: </span> {reverseDateOrder(item.rental_start_date)}
                                                                                        <br /><span>To: </span>{reverseDateOrder(item.rental_end_date)}
                                                                                    </p>
                                                                                        <p className="font-xs">
                                                                                        </p>
                                                                                    </>
                                                                            }
                                                                            </div>
                                                                        </div>
                                                                        <div className="itemContainer-base-sizeAndQtyContainer">
                                                                            <div className="itemContainer-base-sizeAndQty">
                                                                                <div className="itemComponents-base-size">
                                                                                    <span className>Qty: {item.qty}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="itemContainer-base-price">
                                                                            <div className="itemComponents-base-price itemComponents-base-bold">
                                                                                <div>
                                                                                    ₹{item.selling_price}
                                                                                </div>
                                                                            </div>
                                                                            {item.mrp&&<div className="itemContainer-base-discountBlock">
                                                                                <span className="itemComponents-base-strikedAmount">
                                                                                    <span className="itemComponents-base-price itemComponents-base-strike itemContainer-base-strikedAmount">
                                                                                        ₹{item.mrp}
                                                                                    </span>
                                                                                    <span className="itemComponents-base-itemDiscount">{priceOffPercentage(item?.mrp, item?.selling_price)}% OFF</span>
                                                                                </span>
                                                                            </div>}
                                                                        </div>
                                                                        {(item.product_type == "1") &&<div className="returnPeriod-base-returnItem">
                                                                            <div className="returnPeriod-base-returnIcon">
                                                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M6.63639 6.99013C6.84386 7.1976 6.84386 7.53397 6.63639 7.74143L5.7725 8.60533H8.27232C9.21251 8.60533 9.97949 7.84333 9.97949 6.89824C9.97949 5.95914 9.21859 5.19824 8.27949 5.19824H6.89116C6.59776 5.19824 6.35991 4.96039 6.35991 4.66699C6.35991 4.37359 6.59776 4.13574 6.89116 4.13574H8.27949C9.80539 4.13574 11.042 5.37234 11.042 6.89824C11.042 8.43232 9.79722 9.66783 8.27241 9.66783H5.77242L6.63639 10.5318C6.84386 10.7393 6.84386 11.0756 6.63639 11.2831C6.42893 11.4906 6.09256 11.4906 5.88509 11.2831L4.11426 9.51227C4.0417 9.43971 3.99452 9.35138 3.97271 9.25831C3.96352 9.21922 3.95866 9.17846 3.95866 9.13658C3.95866 9.05996 3.97488 8.98713 4.00407 8.92134C4.02519 8.87367 4.05366 8.82847 4.08949 8.78745C4.09828 8.77738 4.10745 8.76764 4.11697 8.75826L5.88509 6.99013C6.09256 6.78267 6.42893 6.78267 6.63639 6.99013Z" fill="#282C3F"></path>
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.416992 7.50033C0.416992 3.58831 3.58831 0.416992 7.50033 0.416992C11.4123 0.416992 14.5837 3.58831 14.5837 7.50033C14.5837 11.4123 11.4123 14.5837 7.50033 14.5837C3.58831 14.5837 0.416992 11.4123 0.416992 7.50033ZM7.50033 1.47949C4.17511 1.47949 1.47949 4.17511 1.47949 7.50033C1.47949 10.8255 4.17511 13.5212 7.50033 13.5212C10.8255 13.5212 13.5212 10.8255 13.5212 7.50033C13.5212 4.17511 10.8255 1.47949 7.50033 1.47949Z" fill="#282C3F"></path>
                                                                                </svg>
                                                                            </div>
                                                                            <div className="returnPeriod-base-returnText">
                                                                                <span className="returnPeriod-base-returnDays">₹{item.p_deposit_amount || 0}</span> Refundable deposite for 5 days rental
                                                                            </div>
                                                                        </div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                        
                                                    })
                                                }
                                            </div>
                                            <div className="itemBlock-base-rightBlock pt-0">
                                        <div className="priceBlock-base-container">
                                            <div className="priceBlock-base-priceHeader mt-0">PRICE DETAILS ({orderDetail?.length} Item)</div>
                                            <div className="priceBreakUp-base-orderSummary" id="priceBlock">
                                                <div className="priceDetail-base-row" >
                                                    <span className>MRP</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(orderDetail?.bill_details?.mrp)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Our Price</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(orderDetail?.bill_details?.our_price)}</span>
                                                    </span>
                                                </div>
                                                {orderDetail?.bill_details?.is_coupon_applied && <div className="priceDetail-base-row">
                                                    <span className>Coupon Discount</span>
                                                    <span className="priceDetail-base-value priceDetail-base-discount">
                                                        <span>-</span>
                                                        <span> <span className>₹</span>{(orderDetail?.bill_details?.coupon_discount)}</span>
                                                    </span>
                                                </div>}
                                                <div className="priceDetail-base-row">
                                                    <span className>Sub Total</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(orderDetail?.bill_details?.sub_total)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Taxes (18%)</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(orderDetail?.bill_details?.tax_amount)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Amount To Be Paid</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(orderDetail?.bill_details?.amount_to_be_paid)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Deposit</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>{(orderDetail?.bill_details?.deposit_amount)}</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-total">
                                                    <span className>Final Price</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className="priceDetail-base-redesignRupeeTotalIcon">₹</span> {(orderDetail?.bill_details?.order_amount)}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                        </div>}
                    </div>
                </section>
            </Layout>}
        </>
    );
}

export default Account;
