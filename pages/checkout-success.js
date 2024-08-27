import Lottie from "lottie-web";
import success from "../public/assets/Lottie/success.json"
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import Link from "next/link";
const OrderSucess = () => {
    useEffect(() => {
        Lottie.loadAnimation({
          container: document.getElementById('animation'),
          animationData: success,
          renderer: 'svg',
          loop: true,
          autoplay: true,
        });
      }, []);
    return (
        <>
            <Layout parent="Home" sub="Order" subChild="Sucess">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="order-sucess-container mb-20">
                            <div id="animation" style={{ width: 200, height: 200 , marginInline:"auto"}} />
                            <h1 className="mb-20">Thank you for ordering!</h1>
                            <p className="mb-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dolorum vitae.</p>
                            <div className="actions">
                                <button className="btn btn-border">
                                    <Link href={"/my-profile?tab=2"}>View order</Link>
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