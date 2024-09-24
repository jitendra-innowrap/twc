import React, { useState } from "react";

const ProductTab = ({productDetails}) => {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className="tab-style3">
                <hr className="wp-block-separator is-style-wide" />
                <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                        <a
                            className={
                                activeIndex === 1
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            id="Description-tab"
                            data-bs-toggle="tab"
                            onClick={() => handleOnClick(1)}
                        >
                            Description
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a
                            className={
                                activeIndex === 2
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            id="Features-tab"
                            data-bs-toggle="tab"
                            onClick={() => handleOnClick(2)}
                        >
                            Features
                        </a>
                    </li> */}
                    <li className="nav-item">
                        <a
                            className={
                                activeIndex === 3
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            id="Terms-n-conditions-tab"
                            data-bs-toggle="tab"
                            onClick={() => handleOnClick(3)}
                        >
                            Terms & Conditions
                        </a>
                    </li>
                </ul>
                <div className="tab-content shop_info_tab entry-main-content">
                    <div
                        className={
                            activeIndex === 1
                                ? "tab-pane fade show active"
                                : "tab-pane fade"
                        }
                        id="Description"
                    >
                        <div className="">
                            
                        <ul className="product-meta font-xs color-grey ">
                            <li className="mb-5">
                                SKU:
                                <a href="#">{productDetails?.sku}</a>
                            </li>
                            <li className="mb-5">
                                Tags:&nbsp;
                                {
                                    productDetails?.product_tags?.map((tag,i)=>(
                                        <a
                                    href="#"
                                    rel="tag"
                                    className="me-1"
                                >
                                    {tag?.name} &nbsp;
                                </a>
                                    ))
                                }
                            </li>
                        </ul>
                            {/* <br />
                            <p>
                                {productDetails?.product_subtext}
                            </p>
                            <br /> */}
                            <div dangerouslySetInnerHTML={{ __html: productDetails?.description }} />
                            </div>
                    </div>
                    {/* <div
                        className={
                            activeIndex === 2
                                ? "tab-pane fade show active"
                                : "tab-pane fade"
                        }
                        id="Features"
                    >
                        <div dangerouslySetInnerHTML={{ __html: productDetails?.highlights }} className="featurese-content" />
                    </div> */}
                    <div
                        className={
                            activeIndex === 3
                                ? "tab-pane fade show active"
                                : "tab-pane fade"
                        }
                        id="Terms-n-conditions"
                    >
                        <div className="">
                            {/* <h4 className="mt-30">Terms & Conditions</h4> */}
                            {/* <hr className="wp-block-separator is-style-wide" /> */}
                            <ol style={{listStyle:'number'}} className="ml-20">
                                <li>All offerings are subject to availability at the time of confirmation.</li>
                                <li>All courier charges to be borne by the customers. </li>
                                <li>⁠Rates may vary seasonally and upon the demands from the listed rates depending on the availability on the date of the confirmation. </li>
                                <li>Rental periods begin at delivery and end at return, with late fees for overdue days. </li>
                                <li>Customers must return items in the same condition received, normal wear and tear excepted.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductTab;
