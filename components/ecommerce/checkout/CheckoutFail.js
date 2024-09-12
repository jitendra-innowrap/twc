import Lottie from "lottie-web";
import Layout from "../../layout/Layout";
import fail from "../../../public/assets/Lottie/fail.json"
import { useEffect, useState } from "react";
import Link from "next/link";
const OrderFail = ({orderDetails}) => {
        useEffect(() => {
            Lottie.loadAnimation({
              container: document.getElementById('animation'),
              animationData: fail,
              renderer: 'svg',
              loop: true,
              autoplay: true,
            });
          }, []);
    
    return (
        <>
            <Layout parent="Home" sub="Order" subChild="Failed">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="order-sucess-container mb-20">
                            <div id="animation" style={{ width: 200, height: 200 , marginInline:"auto"}} />
                            {orderDetails?.order_id ? <p>Order Id: {orderDetails?.order_id}</p>: <p>Something Went Wrong</p>}
                            {orderDetails?.amount ? <p>Amount: {orderDetails?.amount}</p>: null}
                            <h1 className="mb-20 text-danger">Sorry, Payment Failed!</h1>
                            <div className="actions">
                                <button className="btn btn-border">
                                    <Link href={"/shop-cart"}>Try Again</Link>
                                </button>
                                <button className="btn">
                                    <Link href={"/"}>Continue Shopping</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default OrderFail