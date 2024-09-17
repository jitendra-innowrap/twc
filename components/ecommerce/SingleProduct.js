import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";
import Loader from './../elements/Loader';
import { addItemToWishlist, fetchWishlist } from "../../redux/Slices/wishlistSlice";


const SingleProduct = ({product, deleteWishList}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const handleRemoveWishlist = async (product_id)=>{
            dispatch(addItemToWishlist(product_id));
            dispatch(fetchWishlist())
    }
    return (
        <>

{!loading ?  (
<>
            <div className="product-cart-wrap mb-30">
                <div className="product-img-action-wrap">
                    <div className="product-img product-img-zoom">
                        <Link
                            href="/products/detail/[slug]"
                            as={`/products/detail/${product?.handle}`}
                        >
                            <a>
                                <img
                                    className="default-img"
                                    src={product?.product_images?.[0]?.file}
                                    alt={product?.name}
                                />
                                <img
                                    className="hover-img"
                                    src={product?.product_images?.[1]?.file?product?.product_images?.[1]?.file:product?.product_images?.[0]?.file}
                                    alt={product?.name}
                                />
                            </a>
                        </Link>
                    </div>

                    <div className="product-badges product-badges-position product-badges-mrg">
                        {
                            product?.product_tags?.map((tag,i)=>(
                                <span key={i} className="hot" style={{background:tag?.color_code}}>{tag?.name}</span>
                            ))
                        }
                    </div>
                </div>
                {
                    deleteWishList && <div className="delete-icon" onClick={()=>handleRemoveWishlist(product?.id)}>
                        <i className="fi-rs-trash"></i>
                    </div>
                }
                <div className="product-content-wrap">
                    {/* <div className="product-category">
                    <Link href={`/products/${product?.category_handle}/${product?.sub_category_handle}`}>
                        <a>
                            {product?.sub_category_name}
                        </a>
                    </Link>
                    </div> */}
                    <h2>
                    <Link
                            href="/products/detail/[slug]"
                            as={`/products/detail/${product?.handle}`}
                        >
                            <a>{product.name}</a>
                            </Link>
                    </h2>
                    <div className="product-price">
                        <span>₹{product.selling_price} </span>
                        <span className="old-price">{product?.mrp ? `₹ ${product?.mrp}`:null}</span>
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

export default SingleProduct;
