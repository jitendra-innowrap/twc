import Link from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaHeart, FaRegHeart, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { BiInfoCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/Slices/authSlice";
import { addToCart, checkRentalAvailability } from "../../util/api";
import { addItemToCart, fetchCart } from "../../redux/Slices/cartSlice";
import Popup from "reactjs-popup";
import { MdClose } from "react-icons/md";
import LoginRegister from "./LoginRegister";
import storage from "../../util/localStorage";
import { addItemToWishlist, fetchWishlist } from "../../redux/Slices/wishlistSlice";
import { formatPriceInIndianStyle, priceOffPercentage } from "../../util/util";


const colorsVariants = [
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
}) => {
    const fullUrl = typeof window !== 'undefined'
        ? `${window.location.protocol}//${window.location.hostname}`
        : '';
    let daysRent = 5;
    let today = new Date();
    const router = useRouter();
    const dispatch = useDispatch();
    const auth_token = storage.get("auth_token");
    const { slug } = router.query;
    // extracting details from the api
    const productDetails = product?.result?.[0];
    const relatedProducts = product?.similar_product_subcategory;
    const productGallary = product?.result?.[0]?.product_images;
    const collectionBanner = product?.product_bottom_collections?.[0];
    const [heighLightDate, setHeighLightDate] = useState(false)
    const [isInCart, setIsInCart] = useState(false)
    const [isInWishlist, setIsInWishlist] = useState(false)
    const cartItems = useSelector((state) => state.cart.cartItems);
    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
    const [rentalAvailable, setRentalAvailable] = useState({
        isLoading: false, isAvailable: true, isError: ""
    });
    const [calendarStartDate, setCalendarStartDate] = useState(new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)))
    const [calendarEndDate, setCalendarEndDate] = useState(new Date(today.getTime() + (120 * 24 * 60 * 60 * 1000)))
    const [deliveryDate, setDeliveryDate] = useState();
    const [returnByDate, setReturnByDate] = useState();
    const [quantity, setQuantity] = useState(1);
    const { _v2, _v1 } = router.query;
    const [size, setSize] = useState(_v1);
    const [color, setColor] = useState(_v2);
    // const [FixedButtons, setFixedButtons] = useState(true);
    const relatedProductsRef = useRef();

    const FixedButtons = useRef();
    const dateRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (relatedProductsRef.current && FixedButtons.current) {
                const rect = relatedProductsRef.current.getBoundingClientRect();
                const fixedButtonsHeight = FixedButtons.current.offsetHeight; // Get the height of the FixedButtons element

                // Check if the FixedButtons has the 'fixed-buttons' class
                const isFixed = FixedButtons.current.classList.contains("fixed-buttons");
                // Adjust the top position check based on whether the fixed class is applied
                if (rect.top > window.innerHeight + (isFixed ? 0 : fixedButtonsHeight + 20)) {
                    FixedButtons.current.classList.add("fixed-buttons"); // Add class when related products enter the viewport
                } else {
                    FixedButtons.current.classList.remove("fixed-buttons"); // Remove class when related products leave the viewport
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    useEffect(() => {
        setDeliveryDate()
        setHeighLightDate(false)
        setIsInWishlist(product?.result?.[0]?.is_user_wishlist == '1' ? true : false);
        setRentalAvailable({
            isLoading: false, isAvailable: true, isError: ""
        })
    }, [slug])

    useEffect(() => {
      setDefaultVariants();
    }, [productDetails])
    
    const setDefaultVariants = () =>{
        if (product?.result?.[0]?.option_name_1){
            setSize(_v1 || product?.result?.[0]?.product_variants_1?.[0]?.option_value_1)
        }
        if (product?.result?.[0]?.option_name_2){
            setColor(_v2 || product?.result?.[0]?.product_variants_2?.[0]?.option_value_2)
        }
    }
    const handleCart = async (product) => {
        if (isInCart && productDetails?.product_type == "1") {
            router.push('/shop-cart');
        } else {
            if (deliveryDate) {
                dispatch(addItemToCart(product));
            } else {
                setHeighLightDate(true);

                // Scroll the date element into view and focus on it
                if (dateRef.current) {
                    dateRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    dateRef.current.focus();
                }
            }
        }
    };


    useEffect(() => {
        let inCart = cartItems.filter(item => item.product_id == product?.result?.[0]?.id);
        let inWishlist = wishlistItems.filter(item => item.id == product?.result?.[0]?.id);
        setIsInCart(inCart.length ? true : false);
        setIsInWishlist(inWishlist.length ? true : false);
    }, [router.query, handleCart])

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
        if (value)
            return (<button className="custom-date-input" onClick={onClick} ref={ref}>
                {value}
            </button>)
        else {
            return <div onClick={onClick} className={`custom-date-input ${heighLightDate ? 'shake-and-highlight' : ''}`}>
                <span>{rentalAvailable.isLoading ? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : 'Select Date'}</span> <i></i>
            </div>
        }
    });

    const handleDeliveryDateChange = async (date) => {
        setHeighLightDate(false);
        let returnDate = new Date(date.getTime() + (product?.rental_for_days * 24 * 60 * 60 * 1000));
        if (productDetails?.product_type == '1') {
            let params = { qty: 1, end_date: returnDate, start_date: date, product_id: productDetails?.id }
            setRentalAvailable((prevState) => ({
                ...prevState,
                isLoading: true,
                isError: "",
            }));
            setDeliveryDate();
            try {
                // Call the product availability API
                const response = await checkRentalAvailability(params)
                // const isAvailable = response.data.isAvailable;
                if (response?.code == 1) {
                    setRentalAvailable((prevState) => ({
                        ...prevState,
                        isLoading: false,
                        isAvailable: true,
                    }));
                    setDeliveryDate(date);
                    setReturnByDate(returnDate);

                } else {
                    setDeliveryDate();
                    setReturnByDate();
                    setRentalAvailable((prevState) => ({
                        ...prevState,
                        isLoading: false,
                        isAvailable: false,
                        isError: "The product is not available for the selected date. Please choose a different date.",
                    }));
                }
            } catch (error) {
                console.error(error)
                setRentalAvailable((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isAvailable: false,
                    isError: "An error occurred while checking product availability. Please try again later.",
                }));
            }

        } else {
            setDeliveryDate(date);
            setReturnByDate(returnDate);
        }
    };

    const handleWishlist = async (product) => {
        if (!auth_token) {
            router.push(`/page-login-register?referrerUrl=${router?.asPath}`)
        } else {
            dispatch(addItemToWishlist(product));
        }

    };

    const handleQuantity = (type) => {
        if (type === "add" && quantity < 5) {
            setQuantity(quantity + 1);
        } else if (type === "remove" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
            <section className="mt-15 mt-md-5 mb-15 mb-md-5">
                <div className="container">
                    {productDetails ? <div className="row flex-row-reverse">
                        <div className="col-lg-12">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-15">
                                    <div className="col-md-6 col-sm-12 col-xs-12 detail-left">
                                        <div className="detail-gallery">
                                            <div className="product-image-slider">
                                                <ThumbSlider
                                                    product={productGallary}
                                                />
                                            </div>
                                        </div>

                                        {/* <div className="social-icons single-share">
                                            <ul className="text-grey-5 d-inline-block">
                                                <li>
                                                    <strong className="mr-10">
                                                        Share this:
                                                    </strong>
                                                </li>
                                                <li className="social-facebook">
                                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=http://65.2.106.71:8001/products/detail/${productDetails?.handle}`} 
                                                        target="_blank">
                                                        <SlSocialFacebook size={18} color="#606060" />
                                                    </a>
                                                </li>
                                                <li className="social-x">
                                                    <a href={`https://twitter.com/intent/tweet?text=Check out this product:${fullUrl}/products/detail/${productDetails?.handle}`}
                                                    target="_blank">
                                                        <FaXTwitter size={18} color="#606060" />
                                                    </a>
                                                </li>
                                                <li className="social-whatsapp">
                                                    <a href={`https://wa.me/send?text=Check out this product:${fullUrl}/products/detail/${productDetails?.handle}`} 
                                                        data-action="share/whatsapp/share"
                                                        target="_blank">
                                                        <FaWhatsapp size={18} color="#606060"/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div> */}
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12 detail-right">
                                        <div className="detail-info">
                                            <div className="category">
                                                <span>{productDetails?.category_name} | {productDetails?.sub_category_name}</span>
                                            </div>
                                            <div className="sub-category">
                                                <span>{productDetails?.name}</span>
                                            </div>
                                            {/* <h2 className="title-detail"></h2> */}
                                            <div className="c   learfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    {productDetails?.selling_price &&
                                                        <ins>
                                                            <span className="">
                                                                ₹{formatPriceInIndianStyle(productDetails?.selling_price)}
                                                            </span>
                                                            <span className="text-brand ml-10">
                                                                {productDetails?.product_type == "2" ? ` ${priceOffPercentage(productDetails?.mrp, productDetails?.selling_price)}% off` : `For ${product?.rental_for_days} Days Rental`}
                                                            </span>
                                                        </ins>
                                                    }
                                                </div>
                                                <div className="product-price font-md">
                                                    {productDetails?.mrp && <ins className="mrp-price">
                                                        MRP &nbsp;₹<span>{`${formatPriceInIndianStyle(productDetails.mrp)}`}</span>&nbsp;Inclusive of all taxes

                                                    </ins>
                                                    }
                                                </div>
                                                {productDetails?.product_type == "1" && productDetails?.deposit_amount > 0 &&
                                                    <div className="product-price font-md">
                                                        <ins className="mrp-price">
                                                            Refundable Deposit:&nbsp;₹{productDetails?.deposit_amount}&nbsp;
                                                            <span className="deposite-info tooltip-info expand" style={{ textDecoration: 'none', verticalAlign: 'bottom', marginLeft: '5px' }} data-title={`A late fee of ${productDetails?.deduction_from_deposit_per_day}% will be deducted from your security deposit for each day the rental product is returned past the due date.`}>
                                                                <BiInfoCircle size={16} style={{ transform: 'translateY(-1px)' }} />
                                                            </span>

                                                        </ins>
                                                    </div>
                                                }
                                            </div>
                                            {productDetails?.product_type == "2" && <div className="detail-extralink">
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

                                            {productDetails?.option_name_1 && <div className="attr-detail attr-size mt-15 mb-15">
                                                <strong className="mr-10">
                                                    {productDetails?.option_name_1}
                                                </strong>
                                                <ul className="list-filter">
                                                    {productDetails?.product_variants_1?.map(
                                                        (s, i) => (
                                                            <li key={i} className={s?.option_value_1 === size ? 'active' : ''}>
                                                                <a href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setSize(s?.option_value_1);
                                                                    router.replace({
                                                                        query: { ...router.query, _v1:s?.option_value_1 },
                                                                        });
                                                                }}>
                                                                    {s?.option_value_1}
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>}

                                            {productDetails?.option_name_2 && <div className="attr-detail attr-size mt-15 mb-15">
                                                <strong className="mr-10">
                                                    {productDetails?.option_name_2}
                                                </strong>
                                                <ul className="list-filter">
                                                    {productDetails?.product_variants_2?.map(
                                                        (clr, i) => (
                                                            <li key={i} className={clr?.option_value_2 === color ? 'active' : ''}>
                                                                <a href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setColor(clr?.option_value_2);
                                                                    router.replace({
                                                                        query: { ...router.query, _v2:clr?.option_value_2 },
                                                                        });
                                                                }}>
                                                                    {clr?.option_value_2}
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>}

                                            <div className="attr-detail attr-date" ref={dateRef}>
                                                <strong className="">
                                                    {productDetails?.product_type == "2" ? "Event Date" : "Delivery Date"}
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
                                            {!rentalAvailable.isAvailable && <p className="text-danger">{rentalAvailable.isError}</p>}
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>

                                            <div className="detail-extralink">
                                                <div className="product-extra-link2">
                                                    <a href={`https://wa.me/+919892745795/?text=Hi i'm interested in this product: 
                                                               ${fullUrl}/products/detail/${productDetails?.handle}        
                                                    `}
                                                        className="connect"
                                                        target="_blank"
                                                    >
                                                        Connect With Us
                                                        <img
                                                            className="icon"
                                                            alt="The Party Cafe"
                                                            src="/assets/imgs/theme/icons/whatsapp-icon.svg"
                                                        />
                                                    </a>
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                product_id: productDetails?.id,
                                                                mrp: productDetails?.mrp,
                                                                selling_price: productDetails?.selling_price,
                                                                qty: quantity,
                                                                flag: 1,
                                                                size,
                                                                color,
                                                                deduction_from_deposit_per_day: productDetails?.deduction_from_deposit_per_day,
                                                                deposit_amount: productDetails?.deposit_amount,
                                                                rental_start_date: deliveryDate,
                                                                rental_end_date: new Date(deliveryDate?.getTime() + (5 * 24 * 60 * 60 * 1000)),
                                                            })
                                                        }
                                                        className="button button-add-to-cart"
                                                    >
                                                        {(isInCart && productDetails?.product_type == "1") ? 'Go to cart' : 'Add to cart'}
                                                    </button>
                                                    <a
                                                        aria-label="Add To Wishlist"
                                                        className={`action-btn add-to-wishlist ${productDetails?.is_user_wishlist == '1' ? 'isInWishlist' : ''}`}
                                                        onClick={(e) =>
                                                            handleWishlist(
                                                                productDetails?.id
                                                            )
                                                        }
                                                    >
                                                        {isInWishlist ? <FaHeart fill="var(--tpc-theme-primary)" />
                                                            : <FaRegHeart fill="var(--tpc-theme-primary)" />}
                                                    </a>
                                                    <a
                                                        aria-label="Add To Wishlist"
                                                        className={`action-btn add-to-wishlist mobile ${productDetails?.is_user_wishlist == '1' ? 'isInWishlist' : ''}`}
                                                        onClick={(e) =>
                                                            handleWishlist(
                                                                productDetails?.id
                                                            )
                                                        }
                                                    >
                                                        Add To Wishlist
                                                        {isInWishlist ? <FaHeart fill="var(--tpc-theme-primary)" />
                                                            : <FaRegHeart fill="var(--tpc-theme-primary)" />}
                                                    </a>

                                                </div>
                                            </div>
                                            {productDetails?.brand_assurity.length !== 0 && <div className="product-meta brand-assurity-icons mt-50 font-xs mb-10">
                                                <ul>
                                                    {
                                                        productDetails?.brand_assurity?.map((item, i) => (
                                                            <li className="mb-10" key={i}>
                                                                <img alt="the party cafe" src={item?.file} />
                                                                <span>{item?.name}</span>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <>
                                    <ProductTab productDetails={productDetails} />
                                    <div className={`detail-extralink mobile-buttons-style fixed-buttons`} ref={FixedButtons}>
                                        <div className="product-extra-link2">
                                            <button
                                                onClick={(e) =>
                                                    handleCart({
                                                        product_id: productDetails?.id,
                                                        mrp: productDetails?.mrp,
                                                        selling_price: productDetails?.selling_price,
                                                        qty: quantity,
                                                        flag: 1,
                                                        size,
                                                        color,
                                                        deduction_from_deposit_per_day: productDetails?.deduction_from_deposit_per_day,
                                                        deposit_amount: productDetails?.deposit_amount,
                                                        rental_start_date: deliveryDate,
                                                        rental_end_date: new Date(deliveryDate?.getTime() + (5 * 24 * 60 * 60 * 1000)),
                                                    })
                                                }
                                                className="button button-add-to-cart"
                                            >
                                                {(isInCart && productDetails?.product_type == "1") ? 'Go to cart' : 'Add to cart'}
                                            </button>
                                            {/* <a
                                                    aria-label="Add To Wishlist"
                                                    className={`action-btn add-to-wishlist ${productDetails?.is_user_wishlist == '1' ? 'isInWishlist' : ''}`}
                                                    onClick={(e) =>
                                                        handleWishlist(
                                                            productDetails?.id
                                                        )
                                                    }
                                                >
                                                    {isInWishlist ? <FaHeart fill="var(--tpc-theme-primary)" />
                                                        : <FaRegHeart fill="var(--tpc-theme-primary)" />} Add To Wishlist
                                                </a> */}
                                            <a href={`https://wa.me/+919892745795/?text=Hi i'm interested in this product: 
                                                               ${fullUrl}/products/detail/${productDetails?.handle}        
                                                    `}
                                                className="connect"
                                                target="_blank"
                                            >
                                                Connect With Us
                                                <img
                                                    className="icon ml-0"
                                                    alt="The Party Cafe"
                                                    src="/assets/imgs/theme/icons/whatsapp-icon.svg"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    {relatedProducts?.length > 0 && <div className="row mt-30 mt-md-5" ref={relatedProductsRef}>
                                        <div className="col-12">
                                            <h3 className="section-title style-1 mb-30">
                                                Related Products
                                            </h3>
                                        </div>
                                        <div className="col-12">
                                            <div className="row related-products position-relative">
                                                <RelatedSlider related={relatedProducts} />
                                            </div>
                                        </div>
                                    </div>}
                                    {product?.product_bottom_collections?.length > 0 && <Link href={`/collection/${collectionBanner?.collection_handle}`}>
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
                                    </Link>}
                                </>
                            </div>
                        </div>
                    </div> :
                        <div className="loading-view">
                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                    }
                </div>
            </section>
        </>
    );
};

export default ProductDetails;
