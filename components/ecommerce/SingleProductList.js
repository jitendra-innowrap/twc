import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { Bounce, toast } from "react-toastify";
// import { useToasts } from "react-toast-notifications";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import { useState } from "react";
// 

const SingleProductList = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
    // console.log(product);
    let today = new Date();
    const [deliveryDate, setDeliveryDate] = useState(today);
    const [returnByDate, setReturnByDate] = useState(new Date(today.getTime() + (5 * 24 * 60 * 60 * 1000)));
    const handleCart = (product) => {
        addToCart(product);
        toast.success("Add to Cart !",{
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

    const handleCompare = (product) => {
        addToCompare(product);
        toast.success("Add to Compare !",{
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

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast.success("Add to Wishlist !",{
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
            <div className="product-list mb-30">
                <div className="product-cart-wrap">
                    <div className="product-img-action-wrap">
                        <div className="product-img product-img-zoom">
                            <div className="product-img-inner">
                                <Link
                                    href="/products/[slug]"
                                    as={`/products/${product.slug}`}
                                >
                                    <a>
                                        <img
                                            className="default-img"
                                            src={product.images[0].img}
                                            alt=""
                                        />
                                        <img
                                            className="hover-img"
                                            src={product.images[1].img}
                                            alt=""
                                        />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        {/* <div className="product-action-1">
                            <a
                                aria-label="Quick view"
                                className="action-btn hover-up"
                                data-bs-toggle="modal"
                                // data-bs-target="#quickViewModal"
                                onClick={(e) => openQuickView(product)}
                            >
                                <i className="fi-rs-eye"></i>
                            </a>
                            <a
                                aria-label="Add To Wishlist"
                                className="action-btn hover-up"
                                onClick={(e) => handleWishlist(product)}
                            >
                                <i className="fi-rs-heart"></i>
                            </a>
                            <a
                                aria-label="Compare"
                                className="action-btn hover-up"
                                onClick={(e) => handleCompare(product)}
                            >
                                <i className="fi-rs-shuffle"></i>
                            </a>
                        </div> */}

                        <div className="product-badges product-badges-position product-badges-mrg">
                            {product.trending ? (
                                <span className="hot">Hot</span>
                            ):null}
                            {product.created ? (
                                <span className="new">New</span>
                            ):null}
                            {product.totalSell > 100 ? (
                                <span className="best">Best Sell</span>
                            ):null}
                            {product.discount.isActive ? (
                                <span className="sale">Sale</span>
                            ):null}
                            {product.discount.percentage >= 5 ? (
                                <span className="hot">
                                    {product.discount.percentage}%
                                </span>
                            ):null}
                        </div>
                    </div>
                    <div className="product-content-wrap">
                        <div className="product-category">
                            <Link href="/products">
                                <a>{product.category}</a>
                            </Link>
                        </div>
                        <h2>
                            <Link
                                href="/products/[slug]"
                                as={`/products/${product.slug}`}
                            >
                                <a>{product.title}</a>
                            </Link>
                        </h2>
                        <div className="product-price">
                        <span>₹{product.price} </span>
                        <span className="old-price">{product.oldPrice ? `₹ ${product.oldPrice}`:null}</span>
                        </div>

                        <p className="mt-15">{product.desc}</p>

                        <div className="product-action-1 show">
                            <a
                                aria-label="View Details"
                                className="action-btn hover-up"
                                onClick={(e) => handleCart({...product, deliveryDate, returnByDate})}
                            >
                                View details
                                <i className="fi-rs-angle-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
};

const mapDispatchToProps = {
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProductList);
