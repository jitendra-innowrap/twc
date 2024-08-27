
import { Bounce, toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import ShoppingBag from "../components/Svg/ShoppingBag";
import SingleProduct from "../components/ecommerce/SingleProduct";
import { useEffect } from "react";
import storage from "../util/localStorage";
import { useSelector } from "react-redux";

const Wishlist = () => {
    const router = useRouter();
    const isLoggedIn = storage.get("auth_token");
    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
    const status = useSelector((state) => state.wishlist.status);
    useEffect(() => {
        if(!isLoggedIn){
            router.push('/page-login-register')
        }
    }, [])
    
    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Wishlist">
                <section className="mt-50 mb-50">
                    <div className="container">
                        {
                            status=='succeeded'?
                            <div className="row product-grid-4 mobile_product_list">
                                    {wishlistItems?.length == 0 && (
                                        <div className="empty-cart">
                                            <h1>Your Wishlist is empty</h1>
                                            <ShoppingBag />
                                            <div className="cart-action text-center">
                                                <div className="btn" onClick={() => router.push('/')}>
                                                    <span>
                                                        <i className="fi-rs-shopping-bag mr-10"></i>
                                                        Continue Shopping
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {wishlistItems?.map((item, i) => {
                                        
                                            return <div className="col-lg-3 col-md-4 col-6 col-sm-6 product_card"
                                            key={item.id}
                                            >
                                            <SingleProduct product={item} deleteWishList={true} />
                                        </div>
                                    })}
                                </div>
                            :
                            <div className="loading-view" style={{height:'calc( 100vh - 423px)'}}>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                        }
                    </div>
                </section>
            </Layout>
        </>
    );
};
export default Wishlist;
