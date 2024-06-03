import { connect } from "react-redux";
import Layout from "../components/layout/Layout";

import Link from "next/link";
import { clearCart, closeCart, decreaseQuantity, deleteFromCart, increaseQuantity, openCart } from "../redux/action/cart";
import { Bounce, toast } from "react-toastify";
import { addToWishlist } from "../redux/action/wishlistAction";
import { useRouter } from "next/router";

const Cart = ({ openCart, addToWishlist, cartItems, activeCart, closeCart, increaseQuantity, decreaseQuantity, deleteFromCart, clearCart }) => {
    const price = () => {
        let price = 0;
        cartItems.forEach((item) => (price += item.price * item.quantity));

        return price;
    };
    const router = useRouter()

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
            <Layout parent="Home" sub="Shop" subChild="Cart">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row" onClick={console.log(cartItems)}>
                        {cartItems.length <= 0 ?
                    <div className="empty-cart">
                        <h1>Your Cart is empty</h1>
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
                        :
                            <div className="col-12">
                                {
                                    cartItems.map((item, i)=>{
                                        return <div className="cart-item">
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
                                                    <span>SKU:</span> lkjhlgkhkl
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
                                                    <button className="remove" onClick={(e) => deleteFromCart(item)}><i className="fi-rs-trash"></i>Delete</button>
                                                    <button className="move-to-wishlist" onClick={()=>{handleWishlist(item)}}>Move to Wishlist</button>
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
                                <div className="row mb-50">
                                    <div className="col-lg-6 col-md-12">
                                        <div className="heading_s1 mb-3">
                                            <h4>Calculate Shipping</h4>
                                        </div>
                                        <p className="mt-15 mb-30">
                                            Flat rate:
                                            <span className="font-xl text-brand fw-900">5%</span>
                                        </p>
                                        <form className="field_form shipping_calculator">
                                            <div className="form-row">
                                                <div className="form-group col-lg-12">
                                                    <div className="custom_select">
                                                        <select className="form-control select-active">
                                                            <option value="">Choose a option...</option>
                                                            <option value="AX">Aland Islands</option>
                                                            <option value="AF">Afghanistan</option>
                                                            <option value="AL">Albania</option>
                                                            <option value="DZ">Algeria</option>
                                                            <option value="AD">Andorra</option>
                                                            <option value="AO">Angola</option>
                                                            <option value="AI">Anguilla</option>
                                                            <option value="AQ">Antarctica</option>
                                                            <option value="AG">Antigua and Barbuda</option>
                                                            <option value="AR">Argentina</option>
                                                            <option value="AM">Armenia</option>
                                                            <option value="AW">Aruba</option>
                                                            <option value="AU">Australia</option>
                                                            <option value="AT">Austria</option>
                                                            <option value="AZ">Azerbaijan</option>
                                                            <option value="BS">Bahamas</option>
                                                            <option value="BH">Bahrain</option>
                                                            <option value="BD">Bangladesh</option>
                                                            <option value="BB">Barbados</option>
                                                            <option value="BY">Belarus</option>
                                                            <option value="PW">Belau</option>
                                                            <option value="BE">Belgium</option>
                                                            <option value="BZ">Belize</option>
                                                            <option value="BJ">Benin</option>
                                                            <option value="BM">Bermuda</option>
                                                            <option value="BT">Bhutan</option>
                                                            <option value="BO">Bolivia</option>
                                                            <option value="BQ">Bonaire, Saint Eustatius and Saba</option>
                                                            <option value="BA">Bosnia and Herzegovina</option>
                                                            <option value="BW">Botswana</option>
                                                            <option value="BV">Bouvet Island</option>
                                                            <option value="BR">Brazil</option>
                                                            <option value="IO">British Indian Ocean Territory</option>
                                                            <option value="VG">British Virgin Islands</option>
                                                            <option value="BN">Brunei</option>
                                                            <option value="BG">Bulgaria</option>
                                                            <option value="BF">Burkina Faso</option>
                                                            <option value="BI">Burundi</option>
                                                            <option value="KH">Cambodia</option>
                                                            <option value="CM">Cameroon</option>
                                                            <option value="CA">Canada</option>
                                                            <option value="CV">Cape Verde</option>
                                                            <option value="KY">Cayman Islands</option>
                                                            <option value="CF">Central African Republic</option>
                                                            <option value="TD">Chad</option>
                                                            <option value="CL">Chile</option>
                                                            <option value="CN">China</option>
                                                            <option value="CX">Christmas Island</option>
                                                            <option value="CC">Cocos (Keeling) Islands</option>
                                                            <option value="CO">Colombia</option>
                                                            <option value="KM">Comoros</option>
                                                            <option value="CG">Congo (Brazzaville)</option>
                                                            <option value="CD">Congo (Kinshasa)</option>
                                                            <option value="CK">Cook Islands</option>
                                                            <option value="CR">Costa Rica</option>
                                                            <option value="HR">Croatia</option>
                                                            <option value="CU">Cuba</option>
                                                            <option value="CW">CuraÇao</option>
                                                            <option value="CY">Cyprus</option>
                                                            <option value="CZ">Czech Republic</option>
                                                            <option value="DK">Denmark</option>
                                                            <option value="DJ">Djibouti</option>
                                                            <option value="DM">Dominica</option>
                                                            <option value="DO">Dominican Republic</option>
                                                            <option value="EC">Ecuador</option>
                                                            <option value="EG">Egypt</option>
                                                            <option value="SV">El Salvador</option>
                                                            <option value="GQ">Equatorial Guinea</option>
                                                            <option value="ER">Eritrea</option>
                                                            <option value="EE">Estonia</option>
                                                            <option value="ET">Ethiopia</option>
                                                            <option value="FK">Falkland Islands</option>
                                                            <option value="FO">Faroe Islands</option>
                                                            <option value="FJ">Fiji</option>
                                                            <option value="FI">Finland</option>
                                                            <option value="FR">France</option>
                                                            <option value="GF">French Guiana</option>
                                                            <option value="PF">French Polynesia</option>
                                                            <option value="TF">French Southern Territories</option>
                                                            <option value="GA">Gabon</option>
                                                            <option value="GM">Gambia</option>
                                                            <option value="GE">Georgia</option>
                                                            <option value="DE">Germany</option>
                                                            <option value="GH">Ghana</option>
                                                            <option value="GI">Gibraltar</option>
                                                            <option value="GR">Greece</option>
                                                            <option value="GL">Greenland</option>
                                                            <option value="GD">Grenada</option>
                                                            <option value="GP">Guadeloupe</option>
                                                            <option value="GT">Guatemala</option>
                                                            <option value="GG">Guernsey</option>
                                                            <option value="GN">Guinea</option>
                                                            <option value="GW">Guinea-Bissau</option>
                                                            <option value="GY">Guyana</option>
                                                            <option value="HT">Haiti</option>
                                                            <option value="HM">Heard Island and McDonald Islands</option>
                                                            <option value="HN">Honduras</option>
                                                            <option value="HK">Hong Kong</option>
                                                            <option value="HU">Hungary</option>
                                                            <option value="IS">Iceland</option>
                                                            <option value="IN">India</option>
                                                            <option value="ID">Indonesia</option>
                                                            <option value="IR">Iran</option>
                                                            <option value="IQ">Iraq</option>
                                                            <option value="IM">Isle of Man</option>
                                                            <option value="IL">Israel</option>
                                                            <option value="IT">Italy</option>
                                                            <option value="CI">Ivory Coast</option>
                                                            <option value="JM">Jamaica</option>
                                                            <option value="JP">Japan</option>
                                                            <option value="JE">Jersey</option>
                                                            <option value="JO">Jordan</option>
                                                            <option value="KZ">Kazakhstan</option>
                                                            <option value="KE">Kenya</option>
                                                            <option value="KI">Kiribati</option>
                                                            <option value="KW">Kuwait</option>
                                                            <option value="KG">Kyrgyzstan</option>
                                                            <option value="LA">Laos</option>
                                                            <option value="LV">Latvia</option>
                                                            <option value="LB">Lebanon</option>
                                                            <option value="LS">Lesotho</option>
                                                            <option value="LR">Liberia</option>
                                                            <option value="LY">Libya</option>
                                                            <option value="LI">Liechtenstein</option>
                                                            <option value="LT">Lithuania</option>
                                                            <option value="LU">Luxembourg</option>
                                                            <option value="MO">Macao S.A.R., China</option>
                                                            <option value="MK">Macedonia</option>
                                                            <option value="MG">Madagascar</option>
                                                            <option value="MW">Malawi</option>
                                                            <option value="MY">Malaysia</option>
                                                            <option value="MV">Maldives</option>
                                                            <option value="ML">Mali</option>
                                                            <option value="MT">Malta</option>
                                                            <option value="MH">Marshall Islands</option>
                                                            <option value="MQ">Martinique</option>
                                                            <option value="MR">Mauritania</option>
                                                            <option value="MU">Mauritius</option>
                                                            <option value="YT">Mayotte</option>
                                                            <option value="MX">Mexico</option>
                                                            <option value="FM">Micronesia</option>
                                                            <option value="MD">Moldova</option>
                                                            <option value="MC">Monaco</option>
                                                            <option value="MN">Mongolia</option>
                                                            <option value="ME">Montenegro</option>
                                                            <option value="MS">Montserrat</option>
                                                            <option value="MA">Morocco</option>
                                                            <option value="MZ">Mozambique</option>
                                                            <option value="MM">Myanmar</option>
                                                            <option value="NA">Namibia</option>
                                                            <option value="NR">Nauru</option>
                                                            <option value="NP">Nepal</option>
                                                            <option value="NL">Netherlands</option>
                                                            <option value="AN">Netherlands Antilles</option>
                                                            <option value="NC">New Caledonia</option>
                                                            <option value="NZ">New Zealand</option>
                                                            <option value="NI">Nicaragua</option>
                                                            <option value="NE">Niger</option>
                                                            <option value="NG">Nigeria</option>
                                                            <option value="NU">Niue</option>
                                                            <option value="NF">Norfolk Island</option>
                                                            <option value="KP">North Korea</option>
                                                            <option value="NO">Norway</option>
                                                            <option value="OM">Oman</option>
                                                            <option value="PK">Pakistan</option>
                                                            <option value="PS">Palestinian Territory</option>
                                                            <option value="PA">Panama</option>
                                                            <option value="PG">Papua New Guinea</option>
                                                            <option value="PY">Paraguay</option>
                                                            <option value="PE">Peru</option>
                                                            <option value="PH">Philippines</option>
                                                            <option value="PN">Pitcairn</option>
                                                            <option value="PL">Poland</option>
                                                            <option value="PT">Portugal</option>
                                                            <option value="QA">Qatar</option>
                                                            <option value="IE">Republic of Ireland</option>
                                                            <option value="RE">Reunion</option>
                                                            <option value="RO">Romania</option>
                                                            <option value="RU">Russia</option>
                                                            <option value="RW">Rwanda</option>
                                                            <option value="ST">São Tomé and Príncipe</option>
                                                            <option value="BL">Saint Barthélemy</option>
                                                            <option value="SH">Saint Helena</option>
                                                            <option value="KN">Saint Kitts and Nevis</option>
                                                            <option value="LC">Saint Lucia</option>
                                                            <option value="SX">Saint Martin (Dutch part)</option>
                                                            <option value="MF">Saint Martin (French part)</option>
                                                            <option value="PM">Saint Pierre and Miquelon</option>
                                                            <option value="VC">Saint Vincent and the Grenadines</option>
                                                            <option value="SM">San Marino</option>
                                                            <option value="SA">Saudi Arabia</option>
                                                            <option value="SN">Senegal</option>
                                                            <option value="RS">Serbia</option>
                                                            <option value="SC">Seychelles</option>
                                                            <option value="SL">Sierra Leone</option>
                                                            <option value="SG">Singapore</option>
                                                            <option value="SK">Slovakia</option>
                                                            <option value="SI">Slovenia</option>
                                                            <option value="SB">Solomon Islands</option>
                                                            <option value="SO">Somalia</option>
                                                            <option value="ZA">South Africa</option>
                                                            <option value="GS">South Georgia/Sandwich Islands</option>
                                                            <option value="KR">South Korea</option>
                                                            <option value="SS">South Sudan</option>
                                                            <option value="ES">Spain</option>
                                                            <option value="LK">Sri Lanka</option>
                                                            <option value="SD">Sudan</option>
                                                            <option value="SR">Suriname</option>
                                                            <option value="SJ">Svalbard and Jan Mayen</option>
                                                            <option value="SZ">Swaziland</option>
                                                            <option value="SE">Sweden</option>
                                                            <option value="CH">Switzerland</option>
                                                            <option value="SY">Syria</option>
                                                            <option value="TW">Taiwan</option>
                                                            <option value="TJ">Tajikistan</option>
                                                            <option value="TZ">Tanzania</option>
                                                            <option value="TH">Thailand</option>
                                                            <option value="TL">Timor-Leste</option>
                                                            <option value="TG">Togo</option>
                                                            <option value="TK">Tokelau</option>
                                                            <option value="TO">Tonga</option>
                                                            <option value="TT">Trinidad and Tobago</option>
                                                            <option value="TN">Tunisia</option>
                                                            <option value="TR">Turkey</option>
                                                            <option value="TM">Turkmenistan</option>
                                                            <option value="TC">Turks and Caicos Islands</option>
                                                            <option value="TV">Tuvalu</option>
                                                            <option value="UG">Uganda</option>
                                                            <option value="UA">Ukraine</option>
                                                            <option value="AE">United Arab Emirates</option>
                                                            <option value="GB">United Kingdom (UK)</option>
                                                            <option value="US">USA (US)</option>
                                                            <option value="UY">Uruguay</option>
                                                            <option value="UZ">Uzbekistan</option>
                                                            <option value="VU">Vanuatu</option>
                                                            <option value="VA">Vatican</option>
                                                            <option value="VE">Venezuela</option>
                                                            <option value="VN">Vietnam</option>
                                                            <option value="WF">Wallis and Futuna</option>
                                                            <option value="EH">Western Sahara</option>
                                                            <option value="WS">Western Samoa</option>
                                                            <option value="YE">Yemen</option>
                                                            <option value="ZM">Zambia</option>
                                                            <option value="ZW">Zimbabwe</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row row">
                                                <div className="form-group col-lg-6">
                                                    <input required="required" placeholder="State / Country" name="name" type="text" />
                                                </div>
                                                <div className="form-group col-lg-6">
                                                    <input required="required" placeholder="PostCode / ZIP" name="name" type="text" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-lg-12">
                                                    <button className="btn  btn-sm">
                                                        <i className="fi-rs-shuffle mr-10"></i>
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="mb-30 mt-50">
                                            <div className="heading_s1 mb-3">
                                                <h4>Apply Coupon</h4>
                                            </div>
                                            <div className="total-amount">
                                                <div className="left">
                                                    <div className="coupon">
                                                        <form action="#" target="_blank">
                                                            <div className="form-row row justify-content-center">
                                                                <div className="form-group col-lg-6">
                                                                    <input className="font-medium" name="Coupon" placeholder="Enter Your Coupon" />
                                                                </div>
                                                                <div className="form-group col-lg-6">
                                                                    <button className="btn  btn-sm">
                                                                        <i className="fi-rs-label mr-10"></i>
                                                                        Apply
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
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
