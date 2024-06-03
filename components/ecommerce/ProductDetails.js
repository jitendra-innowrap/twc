import Link from "next/link";
import { forwardRef, useState } from "react";
import { connect } from "react-redux";
import { Bounce, toast } from "react-toastify";
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setRequestMeta } from "next/dist/server/request-meta";
import ReactImageMagnify from "react-image-magnify";


const ProductDetails = ({
    product,
    cartItems,
    addToCompare,
    addToCart,
    addToWishlist,
    increaseQuantity,
    decreaseQuantity,
    quickView,
}) => {
    let today = new Date();
    const [deliveryDate, setDeliveryDate] = useState(today);
    const [returnByDate, setReturnByDate] = useState(new Date(today.getTime() + (5 * 24 * 60 * 60 * 1000)));
    let productSizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState(product.variations[0]);
    const [size, setSize] = useState("M");
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <button className="custom-date-input" onClick={onClick} ref={ref}>
        {value}
      </button>
    ));
    const handleDeliveryDateChange = (date) => {
        setDeliveryDate(date);
        setReturnByDate(new Date(date.getTime() + (5 * 24 * 60 * 60 * 1000)));
      };
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

    const handleQuantity = (type)=> {
        if (type === "add") {
            setQuantity(quantity + 1);
          } else if (type === "remove" && quantity > 1) {
            setQuantity(quantity - 1);
          }
    }
    
    const inCart = cartItems.find((cartItem) => cartItem.id === product.id);

    console.log(product);

    return (
        <>
            <section className="mt-50 mb-50">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-12">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-50">
                                    <div className="col-md-6 col-sm-12 col-xs-12 detail-left">
                                        <div className="detail-gallery">

                                            <div className="product-image-slider">
                                                <ThumbSlider
                                                    product={product}
                                                />
                                            </div>
                                        </div>

                                        <div className="social-icons single-share">
                                            <ul className="text-grey-5 d-inline-block">
                                                <li>
                                                    <strong className="mr-10">
                                                        Share this:
                                                    </strong>
                                                </li>
                                                <li className="social-facebook">
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/icons/icon-facebook.svg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </li>
                                                <li className="social-x">
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/icons/icon-x.svg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </li>
                                                <li className="social-instagram">
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/icons/icon-instagram.svg"
                                                            alt=""
                                                        />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {
                                        product?.type ==="purchase"?
                                        <div className="col-md-6 col-sm-12 col-xs-12 detail-right">
                                        <div className="detail-info">
                                            <h2 className="title-detail">
                                                {product?.title}
                                            </h2>
                                            <div className="product-detail-rating">
                                                <div className="pro-details-brand">
                                                    <span>
                                                        Category: &nbsp;
                                                        <Link href="/products">
                                                            <a>
                                                                {product?.category}
                                                            </a>
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    {product?.price && 
                                                    <ins>Price: &nbsp;
                                                        <span className="text-brand">
                                                            ₹{product.price}
                                                        </span>
                                                    </ins>
                                                    }
                                                    {product?.oldPrice &&<ins>
                                                        <span className="old-price font-md ml-15">
                                                         ₹{product.oldPrice}
                                                        </span>
                                                    </ins>
                                                    }
                                                    <span className="save-price  font-md color3 ml-5">
                                                        MRP
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bt-1 border-color-1 mt-15 mb-15"></div>
                                            <div className="short-desc mb-30">
                                                <p>{product?.desc}</p>
                                            </div>
                                            <div className="product_sort_info font-xs mb-30">
                                                <ul>
                                                    <li className="mb-10">
                                                        <i className="fi-rs-crown mr-5"></i>
                                                        1 Year AL Jazeera Brand
                                                        Warranty
                                                    </li>
                                                    <li className="mb-10">
                                                        <i className="fi-rs-refresh mr-5"></i>
                                                        30 Day Return Policy
                                                    </li>
                                                    <li>
                                                        <i className="fi-rs-credit-card mr-5"></i>
                                                        Cash on Delivery
                                                        available
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-color mb-15">
                                                <strong className="mr-10">
                                                    Color
                                                </strong>
                                                <ul className="list-filter color-filter">
                                                    {product.variations.map(
                                                        (clr, i) => (
                                                            <li key={i}>
                                                                <a href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setColor(clr);
                                                                }}>
                                                                    <span
                                                                        className={`product-color-${clr}`}
                                                                        style={{border:`${color===clr? '2px solid #088178':'1px solid gray'}`}}
                                                                    ></span>
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-size mb-15">
                                                <strong className="mr-10">
                                                    Size
                                                </strong>
                                                <ul className="list-filter size-filter font-small">
                                                    {productSizes.map(
                                                        (s, i) => (
                                                            <li className={s===size?'active':''}>
                                                                <a href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setSize(s);
                                                                }}>
                                                                    {s}
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-date">
                                                <strong className="">
                                                    Event Date 
                                                </strong>
                                                <ReactDatePicker
                                                    selected={deliveryDate}
                                                    onChange={(date) => handleDeliveryDateChange(date)}
                                                    customInput={<ExampleCustomInput />}
                                                    minDate={new Date()}
                                                />
                                            </div>
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div className="detail-extralink">
                                                <div className="detail-qty border radius">
                                                    <a onClick={()=>{handleQuantity("remove")}} className="qty-down" >
                                                        <i className="fi-rs-minus-small"></i>
                                                    </a>
                                                    <span className="qty-val">
                                                        {quantity}
                                                    </span>
                                                    <a onClick={()=>{handleQuantity("add")}} className="qty-up" >
                                                        <i className="fi-rs-plus-small"></i>
                                                    </a>
                                                </div>
                                                <div className="product-extra-link2">
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                ...product,
                                                                quantity:quantity ||1,
                                                                color,
                                                                size:size,
                                                                deliveryDate: deliveryDate,
                                                                returnByDate: returnByDate,
                                                            })
                                                        }
                                                        className="button button-add-to-cart"
                                                    >
                                                        Add to cart
                                                    </button>
                                                    <a
                                                        aria-label="Add To Wishlist"
                                                        className="action-btn hover-up"
                                                        onClick={(e) =>
                                                            handleWishlist(
                                                                {
                                                                    ...product,
                                                                    quantity:quantity || 1,
                                                                    color: color,
                                                                    size:size,
                                                                    deliveryDate: deliveryDate,
                                                                    returnByDate: returnByDate,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        <i className="fi-rs-heart"></i>
                                                    </a>
                                                    {/* <a
                                                        aria-label="Compare"
                                                        className="action-btn hover-up"
                                                        onClick={(e) =>
                                                            handleCompare(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        <i className="fi-rs-shuffle"></i>
                                                    </a> */}
                                                </div>
                                            </div>
                                            <ul className="product-meta font-xs color-grey mt-50">
                                                <li className="mb-5">
                                                    SKU:
                                                    <a href="#">FWM15VKT</a>
                                                </li>
                                                <li className="mb-5">
                                                    Tags:
                                                    <a
                                                        href="#"
                                                        rel="tag"
                                                        className="me-1"
                                                    >
                                                        Cloth,
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="detail-info">
                                            <h2 className="title-detail">
                                                {product?.title}
                                            </h2>
                                            <div className="product-detail-rating">
                                                <div className="pro-details-brand">
                                                    <span>
                                                        Category: &nbsp;
                                                        <Link href="/products">
                                                            <a>
                                                                {product?.category}
                                                            </a>
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="clearfix product-price-cover">
                                            <div className="product-price primary-color float-left">
                                                    {product?.price && 
                                                    <ins>Rent: &nbsp;
                                                        <span className="text-brand">
                                                            ₹{product.price}
                                                        </span>
                                                    </ins>
                                                    }
                                                    {product?.oldPrice &&<ins>
                                                        <span className="old-price font-md ml-15">
                                                         ₹{product.oldPrice}
                                                        </span>
                                                    </ins>
                                                    }
                                                    {product?.discount?.percentage &&<span className="save-price  font-md color3 ml-5">
                                                        MRP
                                                    </span>}
                                                </div>
                                            </div>
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    {product?.discount?.percentage &&<span className="save-price  font-md color3">
                                                    Refundable Deposit: &nbsp; ₹{product.price}
                                                    </span>}
                                                </div>
                                            </div>
                                            <div className="bt-1 border-color-1 mt-15 mb-15"></div>
                                            <div className="short-desc mb-30">
                                                <p>{product?.desc}</p>
                                            </div>
                                            <div className="product_sort_info font-xs mb-30">
                                                <ul>
                                                    <li className="mb-10">
                                                        <i className="fi-rs-crown mr-5"></i>
                                                        1 Year AL Jazeera Brand
                                                        Warranty
                                                    </li>
                                                    <li className="mb-10">
                                                        <i className="fi-rs-refresh mr-5"></i>
                                                        30 Day Return Policy
                                                    </li>
                                                    <li>
                                                        <i className="fi-rs-credit-card mr-5"></i>
                                                        Cash on Delivery
                                                        available
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-color mb-15">
                                                <strong className="mr-10">
                                                    Color
                                                </strong>
                                                <ul className="list-filter color-filter">
                                                    {product.variations.map(
                                                        (clr, i) => (
                                                            <li key={i}>
                                                                <a href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setColor(clr);
                                                                }}>
                                                                    <span
                                                                        className={`product-color-${clr}`}
                                                                        style={{border:`${color===clr? '2px solid #088178':'1px solid gray'}`}}
                                                                    ></span>
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-size mb-15">
                                                <strong className="mr-10">
                                                    Size
                                                </strong>
                                                <ul className="list-filter size-filter font-small">
                                                    {productSizes.map(
                                                        (s, i) => (
                                                            <li className={s===size?'active':''}>
                                                                <a href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setSize(s);
                                                                }}>
                                                                    {s}
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-date">
                                                <strong className="">
                                                    Delivery Date 
                                                </strong>
                                                <ReactDatePicker
                                                    selected={deliveryDate}
                                                    onChange={(date) => handleDeliveryDateChange(date)}
                                                    customInput={<ExampleCustomInput />}
                                                    minDate={new Date()}
                                                />
                                                <strong className="">
                                                    Return By 
                                                </strong>
                                                <ReactDatePicker
                                                    selected={returnByDate}
                                                    onChange={(date) => setReturnByDate(date)}
                                                    customInput={<ExampleCustomInput />}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div className="detail-extralink">
                                                {/* <div className="detail-qty border radius">
                                                    <a onClick={()=>{handleQuantity("remove")}} className="qty-down" >
                                                        <i className="fi-rs-minus-small"></i>
                                                    </a>
                                                    <span className="qty-val">
                                                        {quantity}
                                                    </span>
                                                    <a onClick={()=>{handleQuantity("add")}} className="qty-up" >
                                                        <i className="fi-rs-plus-small"></i>
                                                    </a>
                                                </div> */}
                                                <div className="product-extra-link2">
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                ...product,
                                                                quantity:quantity ||1,
                                                                color,
                                                                size:size,
                                                                deliveryDate: deliveryDate,
                                                                returnByDate: returnByDate,
                                                            })
                                                        }
                                                        className="button button-add-to-cart"
                                                    >
                                                        Add to cart
                                                    </button>
                                                    <a
                                                        aria-label="Add To Wishlist"
                                                        className="action-btn hover-up"
                                                        onClick={(e) =>
                                                            handleWishlist(
                                                                {
                                                                    ...product,
                                                                    quantity:quantity ||1,
                                                                    color,
                                                                    size:size,
                                                                    deliveryDate: deliveryDate,
                                                                    returnByDate: returnByDate,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        <i className="fi-rs-heart"></i>
                                                    </a>
                                                    {/* <a
                                                        aria-label="Compare"
                                                        className="action-btn hover-up"
                                                        onClick={(e) =>
                                                            handleCompare(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        <i className="fi-rs-shuffle"></i>
                                                    </a> */}
                                                </div>
                                            </div>
                                            <ul className="product-meta font-xs color-grey mt-50">
                                                <li className="mb-5">
                                                    SKU:
                                                    <a href="#">FWM15VKT</a>
                                                </li>
                                                <li className="mb-5">
                                                    Tags:
                                                    <a
                                                        href="#"
                                                        rel="tag"
                                                        className="me-1"
                                                    >
                                                        Cloth,
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    }
                                </div>

                                {quickView ? null : (
                                    <>
                                        <ProductTab />
                                        <div className="row mt-60">
                                            <div className="col-12">
                                                <h3 className="section-title style-1 mb-30">
                                                    Related products
                                                </h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="banner-img banner-big wow fadeIn f-none animated mt-50">
                                            <img
                                                className="border-radius-10"
                                                src="/assets/imgs/banner/banner-4.png"
                                                alt=""
                                            />
                                            <div className="banner-text">
                                                <h4 className="mb-15 mt-40">
                                                    Repair Services
                                                </h4>
                                                <h2 className="fw-600 mb-20">
                                                    We're an Apple <br />
                                                    Authorised Service Provider
                                                </h2>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart,
});

const mapDispatchToProps = {
    addToCompare,
    addToWishlist,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
