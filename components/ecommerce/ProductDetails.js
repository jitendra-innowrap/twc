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
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { BiInfoCircle } from "react-icons/bi";

const colorsVariants =[
    "red",
    "yellow",
    "white",
    "orange",
    "cyan",
    "green",
    "purple"
];
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
    let daysRent = 5;
    let today = new Date();
    // extracting details from the api
    const productDetails = product?.result?.[0];
    const relatedProducts  = product?.similar_product_subcategory;
    const productGallary = product?.result?.[0]?.product_images;
    const collectionBanner = product?.product_bottom_collections?.[0];


    const [heighLightDate, setHeighLightDate] = useState(false)
    const [isInCart, setIsInCart] = useState(false)
    const [calendarStartDate, setCalendarStartDate] = useState(new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)))
    const [calendarEndDate, setCalendarEndDate] = useState(new Date(today.getTime() + (120 * 24 * 60 * 60 * 1000)))
    const [deliveryDate, setDeliveryDate] = useState();
    const [returnByDate, setReturnByDate] = useState();
    let productSizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("red");
    const [size, setSize] = useState("S");

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
        if(value)
            return(<button className="custom-date-input" onClick={onClick} ref={ref}>
                {value}
            </button>)
            else{
            return<div onClick={onClick} className={`custom-date-input ${heighLightDate?'shake-and-highlight':''}`}>
                <span>Select Date</span> <i></i>
            </div>
            }
    });
    const handleDeliveryDateChange = (date) => {
        setDeliveryDate(date);
        setReturnByDate(new Date(date.getTime() + (5 * 24 * 60 * 60 * 1000)));
    };
    const handleCart = (product) => {
        if(deliveryDate){
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
        }else{
            setHeighLightDate(true)
        }
    };

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast.success("Added to Wishlist !", {
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

    const handleQuantity = (type) => {
        if (type === "add" && quantity < 5) {
            setQuantity(quantity + 1);
        } else if (type === "remove" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const inCart = cartItems.find((cartItem) => cartItem.id === product.id);
    
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
                                                    product={productGallary}
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
                                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=http://65.2.106.71:8001/products/${productDetails?.handle}`} 
                                                        target="_blank">
                                                        <SlSocialFacebook size={18} color="#606060" />
                                                    </a>
                                                </li>
                                                <li className="social-x">
                                                    <a href={`https://twitter.com/intent/tweet?text=Check out this product: http://65.2.106.71:8001/products/${productDetails?.handle}`}
                                                    target="_blank">
                                                        <FaXTwitter size={18} color="#606060" />
                                                    </a>
                                                </li>
                                                {/* <li className="social-instagram">
                                                    <a href={`https://www.instagram.com/?url=http://65.2.106.71:8001/products/${productDetails?.handle}`} 
                                                        target="_blank">
                                                        <FaInstagram size={18} color="#606060"/>
                                                    </a>
                                                </li> */}
                                                <li className="social-whatsapp">
                                                    <a href={`whatsapp://send?text=Check out this product: http://65.2.106.71:8001/products/${productDetails?.handle}`} 
                                                        data-action="share/whatsapp/share"
                                                        target="_blank">
                                                        <FaWhatsapp size={18} color="#606060"/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12 detail-right">
                                        <div className="detail-info">
                                            <div className="category">
                                                <span>{productDetails?.category_name}</span>
                                            </div>
                                            <div className="sub-category">
                                                <span>{productDetails?.sub_category_name}</span>
                                            </div>
                                            <h2 className="title-detail">
                                            {productDetails?.name}
                                            </h2>
                                            <div className="c   learfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    {productDetails?.selling_price &&
                                                        <ins>
                                                            <span className="">
                                                                ₹{productDetails?.selling_price}
                                                            </span>
                                                            <span className="text-brand ml-10">
                                                                {productDetails?.product_type=="2"?`30% off`:`For ${product?.rental_for_days} Days Rental`}
                                                            </span>
                                                        </ins>
                                                    }
                                                </div>
                                                <div className="product-price font-md">
                                                    {productDetails?.mrp && <ins className="mrp-price">
                                                        MRP &nbsp;₹<span>
                                                            {`${productDetails.mrp} `}
                                                        </span>&nbsp;Inclusive of all taxes

                                                    </ins>
                                                    }
                                                </div>
                                                <div className="product-price font-md">
                                                    {productDetails?.product_type=="2" && <ins className="mrp-price">
                                                        Security &nbsp;₹{productDetails.mrp}&nbsp;(Refundable)
                                                        <span className="deposite-info tooltip-info expand" style={{textDecoration:'none', verticalAlign:'bottom', marginLeft:'5px'}} data-title="Refundable within 7 working days!"> 
                                                            <BiInfoCircle />
                                                            {/* <i className="fi-rs-info"></i> */}
                                                        </span>

                                                    </ins>
                                                    }
                                                </div>
                                            </div>
                                            {productDetails?.product_type=="2" && <div className="detail-extralink">
                                                <div className="detail-qty border radius">
                                                    <a onClick={() => { handleQuantity("remove") }} className={`qty-down ${quantity === 1 ? 'disable' : ''}`} >
                                                        <i className="fi-rs-minus-small"></i>
                                                    </a>
                                                    <span className="qty-val">
                                                        {quantity}
                                                    </span>
                                                    <a onClick={() => { handleQuantity("add") }} className={`qty-up ${quantity === 5 ? 'disable' : ''}`} >
                                                        <i className="fi-rs-plus-small"></i>
                                                    </a>
                                                </div>
                                            </div>}

                                            <div className="attr-detail attr-color mb-15">
                                                <strong className="mr-10">
                                                    Color
                                                </strong>
                                                <ul className="list-filter color-filter">
                                                    {colorsVariants.map(
                                                        (clr, i) => (
                                                            <li key={i}>
                                                                <a href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setColor(clr);
                                                                }}>
                                                                    <span
                                                                        className={`product-color-${clr}`}
                                                                        style={{ border: `${color === clr ? '2px solid #088178' : '1px solid gray'}` }}
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
                                                <ul className="list-filter">
                                                    {productSizes.map(
                                                        (s, i) => (
                                                            <li className={s === size ? 'active' : ''}>
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
                                                    {product?.type=="purchase"?"Event Date":"Delivery Date"}
                                                </strong>
                                                <ReactDatePicker
                                                    selected={deliveryDate}
                                                    dateFormat="dd/MM/yyyy"
                                                    onChange={(date) => handleDeliveryDateChange(date)}
                                                    customInput={<ExampleCustomInput />}
                                                    minDate={calendarStartDate}
                                                    maxDate={calendarEndDate}
                                                />
                                            </div>
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div className="detail-extralink">
                                                <div className="product-extra-link2">
                                                    <a href={`https://wa.me/+919892745795/?text=Hi i'm interested in this product: 
                                                                http://65.2.106.71:8001/products/${productDetails?.handle}        
                                                    `}
                                                        className="connect"
                                                        target="_blank"
                                                    >
                                                        Connect with us
                                                        <img
                                                            className="icon"
                                                            alt="Evara"
                                                            src="/assets/imgs/theme/icons/whatsapp-icon.svg"
                                                        />
                                                    </a>
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                ...productDetails,
                                                                quantity: quantity || 1,
                                                                color,
                                                                size: size,
                                                                deliveryDate: deliveryDate,
                                                                returnByDate: new Date(deliveryDate?.getTime() + (5 * 24 * 60 * 60 * 1000)),
                                                            })
                                                        }
                                                        className="button button-add-to-cart"
                                                    >
                                                        Add to cart
                                                    </button>
                                                    <a
                                                        aria-label="Add To Wishlist"
                                                        className="action-btn add-to-wishlist"
                                                        onClick={(e) =>
                                                            handleWishlist(
                                                                {
                                                                    ...product,
                                                                    quantity: quantity || 1,
                                                                    color: color,
                                                                    size: size,
                                                                    deliveryDate: deliveryDate,
                                                                    returnByDate: returnByDate,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        <i className="fi-rs-heart"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            {productDetails?.brand_assurity.length !==0  &&<div className="product-meta brand-assurity-icons mt-50 font-xs mb-10">
                                                <ul>
                                                    {
                                                        productDetails?.brand_assurity?.map((item,i)=>(
                                                            <li className="mb-10">
                                                                <img alt="Evara" src={item?.file} />
                                                                <span>{item?.name}</span>
                                                            </li>
                                                        ))
                                                    }
                                                    {/* <li className="mb-10">
                                                        <img alt="Evara" src="/assets/imgs/theme/icons/shield.png" />
                                                        <span>1 Year Warranty</span>
                                                    </li>
                                                    <li className="mb-10">
                                                        <img alt="Evara" src="/assets/imgs/theme/icons/return.png" />
                                                        <span>30 Day Return</span>
                                                    </li>
                                                    <li>
                                                        <img alt="Evara" src="/assets/imgs/theme/icons/cash-on-delivery.png" />
                                                        <span>COD Available</span>
                                                    </li> */}
                                                </ul>
                                            </div>}
                                        </div>
                                    </div>
                                </div>

                                {quickView ? null : (
                                    <>
                                        <ProductTab productDetails={productDetails} />
                                        {relatedProducts?.length > 0 &&<div className="row mt-60">
                                            <div className="col-12">
                                                <h3 className="section-title style-1 mb-30">
                                                    Related products
                                                </h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider related={relatedProducts} />
                                                </div>
                                            </div>
                                        </div>}
                                        <div className="banner-img banner-big wow fadeIn f-none animated mt-50">
                                            <img
                                                className="border-radius-10"
                                                src={collectionBanner?.collection_image}
                                                alt=""
                                            />
                                            <div className="banner-text">
                                                <h4 className="mb-15 mt-40">
                                                    {productDetails?.category_name}
                                                </h4>
                                                <h2 className="fw-600 mb-20">
                                                   {collectionBanner?.title}
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
