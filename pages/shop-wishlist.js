import { connect } from "react-redux";
import { Bounce, toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import { addToCart } from "../redux/action/cart";
import {
    clearWishlist,
    closeWishlistModal,
    deleteFromWishlist
} from "../redux/action/wishlistAction";
import Link from "next/link";
import { useRouter } from "next/router";
import ShoppingBag from "../components/Svg/ShoppingBag";

const Wishlist = ({
    wishlist,
    clearWishlist,
    closeWishlistModal,
    deleteFromWishlist,
    addToCart,
}) => {
    const router = useRouter()
    const handleCart = (product) => {
        addToCart(product);
        toast.success("Added to Cart !",{
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
                                {wishlist?.items.length > 0 ? (
                                    <div className="table-responsive">
                                       
                                        {
                                    wishlist?.items?.map((item, i)=>{
                                        return <div className="cart-item" onClick={()=> console.log(wishlist)}>
                                            <div className="left">
                                            <div className="image product-thumbnail">
                                                <img src={item.images[0].img} />
                                            </div>
                                            <div className="product-details">
                                                <h5 className="product-name">
                                                    <Link href="/products">
                                                        <a>{`${item.title} - ${item.color}`}</a>
                                                    </Link>
                                                </h5>
                                                <p className="font-xs">
                                                    <span className="text-capitalize">Size:</span> {item.size || item.sizes}
                                                </p>
                                                <p className="font-xs">
                                                    <span>SKU:</span> KLJLKJKKL
                                                </p>
                                                {
                                                    item.type=="purchase"?
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
                                                    item.type!=="purchase"&&<p className="font-xs">
                                                    <span>Quantity:</span>{new Date(item.quantity).toLocaleDateString()}
                                                </p>
                                                }
                                                {item.type=="purchase"&&<div className="detail-qty border radius">
                                                    <a onClick={(e) => decreaseQuantity(item)} className="qty-down">
                                                        <i className="fi-rs-minus-small"></i>
                                                    </a>
                                                    <span className="qty-val">{item.quantity}</span>
                                                    <a onClick={(e) => increaseQuantity(item)} className="qty-up">
                                                        <i className="fi-rs-plus-small"></i>
                                                    </a>
                                                </div>}
                                            </div>
                                            </div>
                                            <div className="pricing">
                                                <div className="clearfix product-price-cover">
                                                    <div className="product-price primary-color float-left">
                                                        {item?.price && 
                                                        <ins className="price">{item.type=="purchase"?`Price `: `Rent: `}<span className="text-brand">₹{item.price}</span>
                                                        </ins>
                                                        }
                                                        {item?.oldPrice &&<ins className="mrp-price">
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
                                                        item.type=="purchase"?
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
                                                        </>:
                                                        <>
                                                        <div className="price-cal">
                                                            <span className="save-price  font-md color3 ml-5">
                                                                {`Refundable deposit: ₹${item.price}`}
                                                            </span>
                                                        </div>
                                                            <div className="price-cal">
                                                                <span className="save-price  font-md color3 ml-5">
                                                                    {`${item.quantity} x ₹${item.price*2}`}
                                                                </span>
                                                            </div>
                                                            <div className="sub-total">
                                                                <span className="save-price  font-md color3 ml-5">
                                                                    {`Subtotal = ₹${(item.quantity * (item.price*2)).toFixed(2)}`}
                                                                </span>
                                                            </div>
                                                        </>

                                                    }
                                                </div>
                                                <div className="product-actions">
                                                    <button className="remove" onClick={(e) => deleteFromWishlist(item)}><i className="fi-rs-trash"></i>Delete</button>
                                                    {/* <button className="move-to-wishlist" onClick={(e) =>handleCart(item)}>Move to Cart</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
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

const mapStateToProps = (state) => ({
    wishlist: state.wishlist,
});

const mapDispatchToProps = {
    closeWishlistModal,
    deleteFromWishlist,
    clearWishlist,
    addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
