import React from 'react'
import { MdClose } from 'react-icons/md';

export default function CartItem({item, deleteFromCart}) {
    return (
        <div className="itemContainer-base-itemMargin">
            <button onClick={()=> deleteFromCart(item)} className="remove_from_cart">
                <MdClose fontSize={16} />
              </button>
                <div className="item-base-item">
                <div className="itemContainer-base-item">
                    <div className="itemContainer-base-itemLeft">
                        <a href="/Shirts/KETCH/KETCH-Men-Blue-Slim-Fit-Cotton-Casual-Shirt/15767156/buy?mini=true&skuId=50561314&sellerPartnerId=4036">
                            <div className style={{ background: 'rgb(255, 237, 243)', height: 148, width: 111 }}>
                                <picture className="image-base-imgResponsive" style={{ width: '100%' }}>
                                    <img src={item.images[0].img} 
                                    className="image-base-imgResponsive" alt="image" fetchpriority="high" loading="eager" style={{ height: 148, width: 111, objectFit:"cover" }} /></picture>
                            </div>
                        </a>
                    </div>
                    <div className="itemContainer-base-itemRight">
                        <div className="itemContainer-base-details" onClick={()=>{console.log(item)}}>
                            <div>
                                <div className="itemContainer-base-brand">{item.category}</div>
                                <a className="itemContainer-base-itemLink" href={`/products/${item.slug}`}>
                                {`${item.title}`} {item.color? ` - ${item.color}`: ''}
                                </a>
                            </div>
                            <div className="itemComponents-base-sellerContainer">
                                <div className="itemComponents-base-sellerData">
                                {
                                    item.type == "purchase" ?
                                        <>
                                            <p className="font-xs">
                                                <span>Event Date:</span> {new Date(item.deliveryDate).toLocaleDateString('en-GB')}
                                            </p>
                                        </>
                                        :
                                        <>
                                            <p className="font-xs">
                                                <span>From: </span> {new Date(item.deliveryDate).toLocaleDateString('en-GB')}
                                                <span> - To: </span>{new Date(item.returnByDate).toLocaleDateString('en-GB')}
                                            </p>
                                            <p className="font-xs">
                                            </p>
                                        </>
                                }
                                </div>
                            </div>
                            <div className="itemContainer-base-sizeAndQtyContainer">
                                <div className="itemContainer-base-sizeAndQty">
                                    <div className="itemComponents-base-size">
                                        <span className>Size: {item.size}</span>
                                    </div>
                                    <div className="itemComponents-base-size">
                                        <span className>Qty: {item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="itemContainer-base-price">
                                <div className="itemComponents-base-price itemComponents-base-bold">
                                    <div>
                                        ₹{item.price}
                                    </div>
                                </div>
                                <div className="itemContainer-base-discountBlock">
                                    <span className="itemComponents-base-strikedAmount">
                                        <span className="itemComponents-base-price itemComponents-base-strike itemContainer-base-strikedAmount">
                                            ₹{item.oldPrice}
                                        </span>
                                        {(() => {
                                        const discount = Math.round((item.oldPrice - item.price) / item.oldPrice * 100);
                                        return (
                                            <span className="itemComponents-base-itemDiscount">{discount}% OFF</span>
                                        );
                                        })()}
                                    </span>
                                </div>
                            </div>
                            {item.type=="rent"&&<div class="returnPeriod-base-returnItem">
                                <div class="returnPeriod-base-returnIcon">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.63639 6.99013C6.84386 7.1976 6.84386 7.53397 6.63639 7.74143L5.7725 8.60533H8.27232C9.21251 8.60533 9.97949 7.84333 9.97949 6.89824C9.97949 5.95914 9.21859 5.19824 8.27949 5.19824H6.89116C6.59776 5.19824 6.35991 4.96039 6.35991 4.66699C6.35991 4.37359 6.59776 4.13574 6.89116 4.13574H8.27949C9.80539 4.13574 11.042 5.37234 11.042 6.89824C11.042 8.43232 9.79722 9.66783 8.27241 9.66783H5.77242L6.63639 10.5318C6.84386 10.7393 6.84386 11.0756 6.63639 11.2831C6.42893 11.4906 6.09256 11.4906 5.88509 11.2831L4.11426 9.51227C4.0417 9.43971 3.99452 9.35138 3.97271 9.25831C3.96352 9.21922 3.95866 9.17846 3.95866 9.13658C3.95866 9.05996 3.97488 8.98713 4.00407 8.92134C4.02519 8.87367 4.05366 8.82847 4.08949 8.78745C4.09828 8.77738 4.10745 8.76764 4.11697 8.75826L5.88509 6.99013C6.09256 6.78267 6.42893 6.78267 6.63639 6.99013Z" fill="#282C3F"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.416992 7.50033C0.416992 3.58831 3.58831 0.416992 7.50033 0.416992C11.4123 0.416992 14.5837 3.58831 14.5837 7.50033C14.5837 11.4123 11.4123 14.5837 7.50033 14.5837C3.58831 14.5837 0.416992 11.4123 0.416992 7.50033ZM7.50033 1.47949C4.17511 1.47949 1.47949 4.17511 1.47949 7.50033C1.47949 10.8255 4.17511 13.5212 7.50033 13.5212C10.8255 13.5212 13.5212 10.8255 13.5212 7.50033C13.5212 4.17511 10.8255 1.47949 7.50033 1.47949Z" fill="#282C3F"></path>
                                    </svg>
                                </div>
                                <div class="returnPeriod-base-returnText">
                                    <span class="returnPeriod-base-returnDays">₹{item.price}</span> Refundable deposite for 5 days rental
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
