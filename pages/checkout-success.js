import Layout from "../components/layout/Layout";
const OrderSucess = () => {
    return (
        <>
            <Layout parent="Home" sub="Order" subChild="Sucess">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="order-sucess-container">
                            <h1>Thank you for ordering!</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam veniam dolorum vitae architecto libero corrupti, qui eveniet soluta amet dolor.</p>
                            <div className="actions">
                                <button>view order</button><button>Continue Shopping</button>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default OrderSucess