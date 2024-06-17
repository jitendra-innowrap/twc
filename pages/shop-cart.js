import { connect } from "react-redux";
import Layout from "../components/layout/Layout";

import Link from "next/link";
import { clearCart, closeCart, decreaseQuantity, deleteFromCart, increaseQuantity, openCart } from "../redux/action/cart";
import { Bounce, toast } from "react-toastify";
import { addToWishlist } from "../redux/action/wishlistAction";
import { useRouter } from "next/router";
import ShoppingBag from "../components/Svg/ShoppingBag";
import ApplyCoupon from "../components/elements/ApplyCoupon";
import EmptyCart from "../components/ecommerce/Dashboard/MyCart/EmptyCart";
import CartItem from "../components/ecommerce/Dashboard/MyCart/CartItem";
import ApplyCoupons from "../components/ecommerce/Dashboard/MyCart/ApplyCoupon";
const Cart = ({ openCart, addToWishlist, cartItems, activeCart, closeCart, increaseQuantity, decreaseQuantity, deleteFromCart, clearCart }) => {
    const price = () => {
        let price = 0;
        cartItems.forEach((item) => {
            if (item.type === "rent") {
                price += (item.price + item.price) * item.quantity;
            } else {
                price += item.price * item.quantity;
            }
        });

        return price;
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
                                            <div className="addressStripV2-base-title">
                                                <div className="addressStripV2-base-addressName">
                                                    Deliver to: <span className="addressStripV2-base-highlight">Jitendra saini</span>,
                                                    <div className="addressStripV2-base-highlight">121004</div>
                                                </div>
                                                <div className="addressStripV2-base-subText">
                                                    Hno 113 gali no 1 ahir wara , Ballabgarh, Faridabad
                                                </div>
                                            </div>
                                            <div className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop">
                                                CHANGE ADDRESS
                                            </div>
                                        </div>
                                        <div id="cartItemsList">
                                            <CartItem />
                                        </div>
                                    </div>
                                    <div className="itemBlock-base-rightBlock">
                                        <ApplyCoupons/>
                                        <div className="priceBlock-base-container">
                                            <div className="priceBlock-base-priceHeader">PRICE DETAILS (1 Item)</div>
                                            <div className="priceBreakUp-base-orderSummary" id="priceBlock">
                                                <div className="priceDetail-base-row">
                                                    <span className>Total MRP</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className>₹</span>1,299</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
                                                    <span className>Discount on MRP</span>
                                                    <span className="priceDetail-base-value priceDetail-base-discount">
                                                        <span>-</span>
                                                        <span> <span className>₹</span>767</span>
                                                    </span>
                                                </div>
                                                <div className="priceDetail-base-row">
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
                                                </div>
                                                <div className="priceDetail-base-total">
                                                    <span className>Total Amount</span>
                                                    <span className="priceDetail-base-value">
                                                        <span />
                                                        <span> <span className="priceDetail-base-redesignRupeeTotalIcon">₹</span>631</span>
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
