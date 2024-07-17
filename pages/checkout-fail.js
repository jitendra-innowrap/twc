import Lottie from "lottie-web";
import Layout from "../components/layout/Layout";
import fail from "../public/assets/Lottie/fail.json"
import { useEffect } from "react";
import Link from "next/link";
const OrderSucess = () => {
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
            <Layout parent="Home" sub="Order" subChild="Fail">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="order-sucess-container mb-20">
                            <div id="animation" style={{ width: 200, height: 200 , marginInline:"auto"}} />
                            <h1 className="mb-20 text-danger">Sorry, Payment Failed!</h1>
                            <p className="mb-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dolorum vitae.</p>
                            <div className="actions">
                                <button className="btn btn-border">
                                    <Link href={"shop-cart"}>Try Again</Link>
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

export default OrderSucess