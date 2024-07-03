
import { Bounce, toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import ShoppingBag from "../components/Svg/ShoppingBag";
import SingleProduct from "../components/ecommerce/SingleProduct";

const Wishlist = ({
    wishlist,
    clearWishlist,
    addToCart,
}) => {
    const router = useRouter()
    const handleCart = (product) => {
        addToCart(product);
        toast.success("Added to Cart !", {
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
    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Wishlist">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {wishlist?.items?.length > 0 ? (
                                    <div className="table-responsive">
                                        <div className="col-lg-4 col-md-4 col-12 col-sm-6"
                                           
                                        >
                                            {
                                                wishlist?.items?.map((item, i) => {
                                                    return <SingleProduct  key={i} product={item} />
                                                })
                                            }
                                        </div>


                                        <div colSpan="6" className="text-end mt-15 mb-15">
                                            {wishlist.items.length > 0 && (
                                                <a onClick={clearWishlist} className="text-muted">
                                                    <i className="fi-rs-cross-small"></i>
                                                    Clear Wishist
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="empty-cart">
                                        <h1>Your Wishlist is empty</h1>
                                        <ShoppingBag />
                                        <div className="cart-action text-center">
                                            <div className="btn" onClick={() => router.push('/products')}>
                                                <span>
                                                    <i className="fi-rs-shopping-bag mr-10"></i>
                                                    Continue Shopping
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};
export default Wishlist;
