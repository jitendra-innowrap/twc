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
    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Wishlist">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {wishlist?.items.length > 0 ? (
                                    <div className="table-responsive">
                                        {/* <table className="table shopping-summery text-center">
                                            <thead>
                                                <tr className="main-heading">
                                                    <th scope="col" colSpan="2">
                                                        Product
                                                    </th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">
                                                        Stock Status
                                                    </th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {wishlist.items.map(
                                                    (product) => (
                                                        <tr>
                                                            <td className="image product-thumbnail">
                                                                <img
                                                                    src={
                                                                        product
                                                                            .images[0]
                                                                            .img
                                                                    }
                                                                    alt=""
                                                                    className="img-fluid"
                                                                    width="70"
                                                                />
                                                            </td>

                                                            <td className="product-des product-name">
                                                                <h5 className="product-name">
                                                                    <a>
                                                                        {
                                                                            product.title
                                                                        }
                                                                    </a>
                                                                </h5>
                                                                <p className="font-xs">
                                                                    Maboriosam
                                                                    in a tonto
                                                                    nesciung
                                                                    eget
                                                                    <br />
                                                                    distingy
                                                                    magndapibus.
                                                                </p>
                                                            </td>
                                                            <td
                                                                className="price"
                                                                data-title="Price"
                                                            >
                                                                <span>
                                                                    $
                                                                    {
                                                                        product.price
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td
                                                                className="text-center"
                                                                data-title="Stock"
                                                            >
                                                                {product.stock ===
                                                                0 ? (
                                                                    <span className="text-danger font-weight-bold">
                                                                        Out of
                                                                        stock
                                                                    </span>
                                                                ) : (
                                                                    <span className="color3 font-weight-bold">
                                                                        In Stock
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td
                                                                className="text-right"
                                                                data-title="Cart"
                                                            >
                                                                {product.stock ===
                                                                0 ? (
                                                                    <button className="btn btn-sm btn-secondary">
                                                                        <i className="fi-rs-headset mr-5"></i>
                                                                        Contact
                                                                        Us
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="btn btn-sm"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleCart(
                                                                                product
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fi-rs-shopping-bag mr-5"></i>
                                                                        Add to
                                                                        cart
                                                                    </button>
                                                                )}
                                                            </td>
                                                            <td
                                                                className="action"
                                                                data-title="Remove"
                                                            >
                                                                <a
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteFromWishlist(
                                                                            product.id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fi-rs-trash"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table> */}
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
                                                    <span>Size:</span> {item.size}
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
                    <svg viewBox="656 573 264 182" version="1.1">
                      <rect
                        id="bg-line"
                        stroke="none"
                        fillOpacity="0.2"
                        fill="#088178"
                        fillRule="evenodd"
                        x="656"
                        y="624"
                        width="206"
                        height="38"
                        rx="19"
                      ></rect>
                      <rect
                        id="bg-line"
                        stroke="none"
                        fillOpacity="0.2"
                        fill="#088178"
                        fillRule="evenodd"
                        x="692"
                        y="665"
                        width="192"
                        height="29"
                        rx="14.5"
                      ></rect>
                      <rect
                        id="bg-line"
                        stroke="none"
                        fillOpacity="0.2"
                        fill="#088178"
                        fillRule="evenodd"
                        x="678"
                        y="696"
                        width="192"
                        height="33"
                        rx="16.5"
                      ></rect>
                      <g
                        id="shopping-bag"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        transform="translate(721.000000, 630.000000)"
                      >
                        <polygon id="Fill-10" fill="#088178" points="4 29 120 29 120 0 4 0"></polygon>
                        <polygon id="Fill-14" fill="#088178" points="120 29 120 0 115.75 0 103 12.4285714 115.75 29"></polygon>
                        <polygon id="Fill-15" fill="#088178" points="4 29 4 0 8.25 0 21 12.4285714 8.25 29"></polygon>
                        <polygon id="Fill-33" fill="#088178" points="110 112 121.573723 109.059187 122 29 110 29"></polygon>
                        <polygon id="Fill-35" fillOpacity="0.5" fill="#FFFFFF" points="2 107.846154 10 112 10 31 2 31"></polygon>
                        <path
                          d="M107.709596,112 L15.2883462,112 C11.2635,112 8,108.70905 8,104.648275 L8,29 L115,29 L115,104.648275 C115,108.70905 111.7365,112 107.709596,112"
                          id="Fill-36"
                          fill="#088178"
                        ></path>
                        <path
                          d="M122,97.4615385 L122,104.230231 C122,108.521154 118.534483,112 114.257931,112 L9.74206897,112 C5.46551724,112 2,108.521154 2,104.230231 L2,58"
                          id="Stroke-4916"
                          stroke="#000000"
                          strokeWidth="3"
                          strokeLinecap="round"
                        ></path>
                        <polyline
                          id="Stroke-4917"
                          stroke="#000000"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points="2 41.5 2 29 122 29 122 79"
                        ></polyline>
                        <path
                          d="M4,50 C4,51.104 3.104,52 2,52 C0.896,52 0,51.104 0,50 C0,48.896 0.896,48 2,48 C3.104,48 4,48.896 4,50"
                          id="Fill-4918"
                          fill="#000000"
                        ></path>
                        <path d="M122,87 L122,89" id="Stroke-4919" stroke="#000000" strokeWidth="3" strokeLinecap="round"></path>
                        <polygon
                          id="Stroke-4922"
                          stroke="#000000"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points="4 29 120 29 120 0 4 0"
                        ></polygon>
                        <path
                          d="M87,46 L87,58.3333333 C87,71.9 75.75,83 62,83 L62,83 C48.25,83 37,71.9 37,58.3333333 L37,46"
                          id="Stroke-4923"
                          stroke="#000000"
                          strokeWidth="3"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M31,45 C31,41.686 33.686,39 37,39 C40.314,39 43,41.686 43,45"
                          id="Stroke-4924"
                          stroke="#000000"
                          strokeWidth="3"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M81,45 C81,41.686 83.686,39 87,39 C90.314,39 93,41.686 93,45"
                          id="Stroke-4925"
                          stroke="#000000"
                          strokeWidth="3"
                          strokeLinecap="round"
                        ></path>
                        <path d="M8,0 L20,12" id="Stroke-4928" stroke="#000000" strokeWidth="3" strokeLinecap="round"></path>
                        <path d="M20,12 L8,29" id="Stroke-4929" stroke="#000000" strokeWidth="3" strokeLinecap="round"></path>
                        <path d="M20,12 L20,29" id="Stroke-4930" stroke="#000000" strokeWidth="3" strokeLinecap="round"></path>
                        <path d="M115,0 L103,12" id="Stroke-4931" stroke="#000000" strokeWidth="3" strokeLinecap="round"></path>
                        <path d="M103,12 L115,29" id="Stroke-4932" stroke="#000000" strokeWidth="3" strokeLinecap="round"></path>
                        <path d="M103,12 L103,29" id="Stroke-4933" stroke="#000000" strokeWidth="3" strokeLinecap="round"></path>
                      </g>
                      <g
                        id="glow"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        transform="translate(768.000000, 615.000000)"
                      >
                        <rect id="Rectangle-2" fill="#000000" x="14" y="0" width="2" height="9" rx="1"></rect>
                        <rect
                          fill="#000000"
                          transform="translate(7.601883, 6.142354) rotate(-12.000000) translate(-7.601883, -6.142354)"
                          x="6.60188267"
                          y="3.14235449"
                          width="2"
                          height="6"
                          rx="1"
                        ></rect>
                        <rect
                          fill="#000000"
                          transform="translate(1.540235, 7.782080) rotate(-25.000000) translate(-1.540235, -7.782080)"
                          x="0.54023518"
                          y="6.28207994"
                          width="2"
                          height="3"
                          rx="1"
                        ></rect>
                        <rect
                          fill="#000000"
                          transform="translate(29.540235, 7.782080) scale(-1, 1) rotate(-25.000000) translate(-29.540235, -7.782080)"
                          x="28.5402352"
                          y="6.28207994"
                          width="2"
                          height="3"
                          rx="1"
                        ></rect>
                        <rect
                          fill="#000000"
                          transform="translate(22.601883, 6.142354) scale(-1, 1) rotate(-12.000000) translate(-22.601883, -6.142354)"
                          x="21.6018827"
                          y="3.14235449"
                          width="2"
                          height="6"
                          rx="1"
                        ></rect>
                      </g>
                      <polygon
                        id="plus"
                        stroke="none"
                        fill="#088178"
                        fillRule="evenodd"
                        points="689.681239 597.614697 689.681239 596 690.771974 596 690.771974 597.614697 692.408077 597.614697 692.408077 598.691161 690.771974 598.691161 690.771974 600.350404 689.681239 600.350404 689.681239 598.691161 688 598.691161 688 597.614697"
                      ></polygon>
                      <polygon
                        id="plus"
                        stroke="none"
                        fill="#088178"
                        fillRule="evenodd"
                        points="733.681239 573.614697 733.681239 572 734.771974 572 734.771974 573.614697 736.408077 573.614697 736.408077 574.691161 734.771974 574.691161 734.771974 576.350404 733.681239 576.350404 733.681239 574.691161 732 574.691161 732 573.614697"
                      ></polygon>
                      <polygon
                        id="plus"
                        stroke="none"
                        fill="#088178"
                        fillRule="evenodd"
                        points="889.681239 597.614697 889.681239 596 890.771974 596 890.771974 597.614697 892.408077 597.614697 892.408077 598.691161 890.771974 598.691161 890.771974 600.350404 889.681239 600.350404 889.681239 598.691161 888 598.691161 888 597.614697"
                      ></polygon>
                    </svg>
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
