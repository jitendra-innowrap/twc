import Lottie from "lottie-web";
import Layout from "../components/layout/Layout";
import fail from "../public/assets/Lottie/fail.json"
import { useEffect } from "react";
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
            <Layout parent="Home" sub="Order" subChild="Sucess">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="order-sucess-container mb-20">
                            <div id="animation" style={{ width: 200, height: 200 , marginInline:"auto"}} />
                            <h1 className="mb-20 text-danger">Sorry, Payment Failed!</h1>
                            <p className="mb-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dolorum vitae.</p>
                            <div className="actions">
                                <button className="btn btn-border">Try Again</button>
                                <button className="btn">Continue Shopping</button>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default OrderSucess