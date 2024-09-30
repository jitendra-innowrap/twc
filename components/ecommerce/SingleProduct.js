import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";
import Loader from './../elements/Loader';
import { addItemToWishlist, fetchWishlist } from "../../redux/Slices/wishlistSlice";
import { formatPriceInIndianStyle } from "../../util/util";


const SingleProduct = ({product, deleteWishList, variants}) => {
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
                        <a
                            href={`/products/detail/${product?.handle}${
                                (product?.option_value_1 || product?.option_value_2) ? 
                                `?${product?.option_value_1 ? `_v1=${product?.option_value_1}` : ''}${
                                  product?.option_value_1 && product?.option_value_2 ? '&' : ''
                                }${product?.option_value_2 ? `_v2=${product?.option_value_2}` : ''}` : ''
                              }`}
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
                        </a>
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
                    <h2>
                    <a
                        href={`/products/detail/${product?.handle}${
                            (product?.option_value_1 || product?.option_value_2) ? 
                            `?${product?.option_value_1 ? `_v1=${product?.option_value_1}` : ''}${
                              product?.option_value_1 && product?.option_value_2 ? '&' : ''
                            }${product?.option_value_2 ? `_v2=${product?.option_value_2}` : ''}` : ''
                          }`}
                        >
                            <a>{product.name}</a>
                            </a>
                    </h2>
                    <div className="product-price">
                        <span>₹{formatPriceInIndianStyle(product.selling_price)} </span>
                        <span className="old-price">{product?.mrp ? `₹${formatPriceInIndianStyle(product?.mrp)}`:null}</span>
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
