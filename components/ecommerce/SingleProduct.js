import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Bounce, toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import Loader from './../elements/Loader';


const SingleProduct = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
    let today = new Date();
    const [loading, setLoading] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState(today);
    const [returnByDate, setReturnByDate] = useState(new Date(today.getTime() + (5 * 24 * 60 * 60 * 1000)));
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

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
        toast.success("Added to Wishlist !",{
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

{!loading ?  (
<>
            <div className="product-cart-wrap mb-30">
                <div className="product-img-action-wrap">
                    <div className="product-img product-img-zoom">
                        <Link
                            href="/products/[slug]"
                            as={`/products/${product.handle}`}
                        >
                            <a>
                                <img
                                    className="default-img"
                                    src={product.product_images[0].file}
                                    alt={product.name}
                                />
                                <img
                                    className="hover-img"
                                    src={product.product_images[1].file}
                                    alt={product.name}
                                />
                            </a>
                        </Link>
                    </div>

                    <div className="product-badges product-badges-position product-badges-mrg">
                        {
                            product.product_tags.map((tag,i)=>(
                                <><span className="hot" style={{background:tag.color_code}}>{tag.name}</span></>
                            ))
                        }
                    </div>
                </div>
                <div className="product-content-wrap">
                    <div className="product-category">
                    <Link href={`/${product?.category_handle}/${product?.sub_category_handle}`}>
                        <a>
                            {product.sub_category_name}
                        </a>
                    </Link>
                    </div>
                    <h2>
                    <Link
                            href="/products/[slug]"
                            as={`/products/${product.handle}`}
                        >
                            <a>{product.name}</a>
                            </Link>
                    </h2>
                    <div className="product-price">
                        <span>₹{product.selling_price} </span>
                        <span className="old-price">{product.mrp ? `₹ ${product.mrp}`:null}</span>
                    </div>
                </div>
            </div>

            </>
            ):(
                <Loader/>
            )}
        </>
    );
};

const mapDispatchToProps = {
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
