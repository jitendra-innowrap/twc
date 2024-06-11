import { connect } from "react-redux";
import Layout from "../components/layout/Layout";

import Link from "next/link";
import { clearCart, closeCart, decreaseQuantity, deleteFromCart, increaseQuantity, openCart } from "../redux/action/cart";
import { Bounce, toast } from "react-toastify";
import { addToWishlist } from "../redux/action/wishlistAction";
import { useRouter } from "next/router";
import ShoppingBag from "../components/Svg/ShoppingBag";
import ApplyCoupon from "../components/elements/ApplyCoupon";
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
                                <div className="empty-cart">
                                    <h1>Your Cart is empty</h1>
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
                                :
                                <div className="row">
                                    <div className="col-8 cart-detail">
                                        {
                                            cartItems.map((item, i) => {
                                                return <div className="cart-item mb-15 border p-md-4 p-30 border-radius">
                                                    <div className="left">
                                                        <div className="image product-thumbnail">
                                                            <img src={item.images[0].img} />
                                                        </div>
                                                        <div className="product-details">
                                                            <h5 className="product-name">
                                                                <Link href={`/products/${item.slug}`}>
                                                                    <a>{`${item.title} - ${item.color}`}</a>
                                                                </Link>
                                                            </h5>
                                                            <p className="font-xs">
                                                                <span className="text-capitalize">Size:</span> {item.size || item.sizes}
                                                            </p>
                                                            <p className="font-xs">
                                                                <span>SKU:</span> lkjhlgkhkl
                                                            </p>
                                                            {
                                                                item.type == "purchase" ?
                                                                    <>
                                                                        <p className="font-xs">
                                                                            <span>Event Date:</span> {new Date(item.deliveryDate).toLocaleDateString()}
                                                                        </p>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <p className="font-xs">
                                                                            <span>Delivery Date:</span> {new Date(item.deliveryDate).toLocaleDateString()}
                                                                        </p>
                                                                        <p className="font-xs">
                                                                            <span>Return By:</span>{new Date(item.returnByDate).toLocaleDateString()}
                                                                        </p>
                                                                    </>
                                                            }
                                                            {
                                                                item.type !== "purchase" && <p className="font-xs">
                                                                    <span>Quantity:</span>{new Date(item.quantity).toLocaleDateString()}
                                                                </p>
                                                            }
                                                            {item.type == "purchase" && <div className="detail-qty border radius">
                                                                <a onClick={(e) => decreaseQuantity(item)} className={`qty-down ${item.quantity === 1 ? 'disable' : ''}`}>
                                                                    <i className="fi-rs-minus-small"></i>
                                                                </a>
                                                                <span className="qty-val">{item.quantity}</span>
                                                                <a onClick={(e) => increaseQuantity(item)} className={`qty-up ${item.quantity === 5 ? 'disable' : ''}`}>
                                                                    <i className="fi-rs-plus-small"></i>
                                                                </a>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                    <div className="pricing">
                                                        <div className="clearfix product-price-cover">
                                                            <div className="product-price primary-color float-left">
                                                                {item?.price &&
                                                                    <ins className="price">{item.type == "purchase" ? `Price ` : `Rent: `}<span className="text-brand">₹{item.price}</span>
                                                                    </ins>
                                                                }
                                                                {item?.oldPrice && <ins className="mrp-price">
                                                                    <span className="old-price font-md ml-15">
                                                                        ₹{item.oldPrice}
                                                                    </span>
                                                                </ins>
                                                                }
                                                                <span className="save-price  font-md color3 ml-5">
                                                                    MRP
                                                                </span>
                                                            </div>
                                                            {
                                                                item.type == "purchase" ?
                                                                    <>
                                                                        <div className="price-cal">
                                                                            <span className="save-price  font-md color3 ml-5">
                                                                                {`${item.quantity} x ₹${item.price}`}
                                                                            </span>
                                                                        </div>
                                                                        <div className="sub-total">
                                                                            <span className="save-price  font-md color3 ml-5">
                                                                                {`Subtotal = ₹${(item.quantity * item.price).toFixed(2)}`}
                                                                            </span>
                                                                        </div>
                                                                    </> :
                                                                    <>
                                                                        <div className="price-cal">
                                                                            <span className="save-price  font-md color3 ml-5">
                                                                                {`Refundable deposit: ₹${item.price}`}
                                                                            </span>
                                                                        </div>
                                                                        <div className="price-cal">
                                                                            <span className="save-price  font-md color3 ml-5">
                                                                                {`${item.quantity} x ₹${item.price * 2}`}
                                                                            </span>
                                                                        </div>
                                                                        <div className="sub-total">
                                                                            <span className="save-price  font-md color3 ml-5">
                                                                                {`Subtotal = ₹${(item.quantity * (item.price * 2)).toFixed(2)}`}
                                                                            </span>
                                                                        </div>
                                                                    </>

                                                            }
                                                        </div>
                                                        <div className="product-actions">
                                                            <button className="remove" onClick={(e) => deleteFromCart(item)}><i className="fi-rs-trash"></i>Delete</button>
                                                            <button className="move-to-wishlist" onClick={() => { handleWishlist(item) }}>Move to Wishlist</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <div colSpan="6" className="text-end mt-15 mb-15">
                                            {cartItems.length > 0 && (
                                                <a onClick={clearCart} className="text-muted">
                                                    <i className="fi-rs-cross-small"></i>
                                                    Clear Cart
                                                </a>
                                            )}
                                        </div>
                                        <div className="cart-action text-end">
                                            <a className="btn ">
                                                <i className="fi-rs-shopping-bag mr-10"></i>
                                                Continue Shopping
                                            </a>
                                        </div>
                                        <div className="divider center_icon mt-50 mb-50">
                                            <i className="fi-rs-fingerprint"></i>
                                        </div>
                                    </div>
                                    <div className="col-4 billing-detail">
                                        <div className="row mb-50">
                                            <div className="col-md-12 mb-15">
                                                <div className="border p-md-4 p-30 border-radius cart-totals">
                                                    <div className="heading_s1 mb-3">
                                                        <h4>Cart Totals</h4>
                                                    </div>
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="cart_total_label">Cart Subtotal</td>
                                                                    <td className="cart_total_amount">
                                                                        <span className="font-lg fw-900 text-brand">$ {price()}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="cart_total_label">Shipping</td>
                                                                    <td className="cart_total_amount">
                                                                        <i className="ti-gift mr-5"></i>
                                                                        Free Shipping
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="cart_total_label">Total</td>
                                                                    <td className="cart_total_amount">
                                                                        <strong>
                                                                            <span className="font-xl fw-900 text-brand">${price()}</span>
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <a href="#" className="btn ">
                                                        <i className="fi-rs-box-alt mr-10"></i>
                                                        Proceed To CheckOut
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <ApplyCoupon />
                                            </div>
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
