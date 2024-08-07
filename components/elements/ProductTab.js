import React, { useState } from "react";

const ProductTab = ({productDetails}) => {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className="tab-style3">
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
                    <li className="nav-item">
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
                    </li>
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
                            <br />
                            <p>
                                {productDetails?.product_subtext}
                            </p>
                            <br />
                            <div onClick={()=>{console.log(productDetails?.description)}} dangerouslySetInnerHTML={{ __html: productDetails?.description }} />
                        </div>
                    </div>
                    <div
                        className={
                            activeIndex === 2
                                ? "tab-pane fade show active"
                                : "tab-pane fade"
                        }
                        id="Features"
                    >
                        <div dangerouslySetInnerHTML={{ __html: productDetails?.highlights }} className="featurese-content" />
                    </div>
                    <div
                        className={
                            activeIndex === 3
                                ? "tab-pane fade show active"
                                : "tab-pane fade"
                        }
                        id="Terms-n-conditions"
                    >
                        <div className="">
                            <hr className="wp-block-separator is-style-dots" />
                            <p>
                                Laconic overheard dear woodchuck wow this
                                outrageously taut beaver hey hello far
                                meadowlark imitatively egregiously hugged that
                                yikes minimally unanimous pouted flirtatiously
                                as beaver beheld above forward energetic across
                                this jeepers beneficently cockily less a the
                                raucously that magic upheld far so the this
                                where crud then below after jeez enchanting
                                drunkenly more much wow callously irrespective
                                limpet.
                            </p>
                            <h4 className="mt-30">Terms & Conditions</h4>
                            <hr className="wp-block-separator is-style-wide" />
                            <p>
                                Less lion goodness that euphemistically robin
                                expeditiously bluebird smugly scratched far
                                while thus cackled sheepishly rigid after due
                                one assenting regarding censorious while
                                occasional or this more crane went more as this
                                less much amid overhung anathematic because much
                                held one exuberantly sheep goodness so where rat
                                wry well concomitantly.
                            </p>
                            <p>
                                Scallop or far crud plain remarkably far by thus
                                far iguana lewd precociously and and less
                                rattlesnake contrary caustic wow this near alas
                                and next and pled the yikes articulate about as
                                less cackled dalmatian in much less well jeering
                                for the thanks blindly sentimental whimpered
                                less across objectively fanciful grimaced wildly
                                some wow and rose jeepers outgrew lugubrious
                                luridly irrationally attractively dachshund.
                            </p>
                        </div>
                        {/* Comment section backup */}
                        {/* <div className="comments-area">
                            <div className="row">
                                <div className="col-lg-8">
                                    <h4 className="mb-30">
                                        Customer questions & answers
                                    </h4>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img
                                                        src="/assets/imgs/page/avatar-6.jpg"
                                                        alt=""
                                                    />
                                                    <h6>
                                                        <a href="#">
                                                            Jacky Chan
                                                        </a>
                                                    </h6>
                                                    <p className="font-xxs">
                                                        Since 2012
                                                    </p>
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%",
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>
                                                        Thank you very fast
                                                        shipping from Poland
                                                        only 3days.
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">
                                                                December 4, 2020
                                                                at 3:12 pm
                                                            </p>
                                                            <a
                                                                href="#"
                                                                className="text-brand btn-reply"
                                                            >
                                                                Reply
                                                                <i className="fi-rs-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img
                                                        src="/assets/imgs/page/avatar-7.jpg"
                                                        alt=""
                                                    />
                                                    <h6>
                                                        <a href="#">
                                                            Ana Rosie
                                                        </a>
                                                    </h6>
                                                    <p className="font-xxs">
                                                        Since 2008
                                                    </p>
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%",
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>
                                                        Great low price and
                                                        works well.
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">
                                                                December 4, 2020
                                                                at 3:12 pm
                                                            </p>
                                                            <a
                                                                href="#"
                                                                className="text-brand btn-reply"
                                                            >
                                                                Reply
                                                                <i className="fi-rs-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img
                                                        src="/assets/imgs/page/avatar-8.jpg"
                                                        alt=""
                                                    />
                                                    <h6>
                                                        <a href="#">
                                                            Steven Keny
                                                        </a>
                                                    </h6>
                                                    <p className="font-xxs">
                                                        Since 2010
                                                    </p>
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%",
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>
                                                        Authentic and Beautiful,
                                                        Love these way more than
                                                        ever expected They are
                                                        Great earphones
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">
                                                                December 4, 2020
                                                                at 3:12 pm
                                                            </p>
                                                            <a
                                                                href="#"
                                                                className="text-brand btn-reply"
                                                            >
                                                                Reply
                                                                <i className="fi-rs-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <h4 className="mb-30">Customer reviews</h4>
                                    <div className="d-flex mb-30">
                                        <div className="product-rate d-inline-block mr-15">
                                            <div
                                                className="product-rating"
                                                style={{
                                                    width: "90%",
                                                }}
                                            ></div>
                                        </div>
                                        <h6>4.8 out of 5</h6>
                                    </div>
                                    <div className="progress">
                                        <span>5 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 50%",
                                            }}
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            50%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>4 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 25%",
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            25%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>3 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 45%",
                                            }}
                                            aria-valuenow="45"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            45%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>2 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 65%",
                                            }}
                                            aria-valuenow="65"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            65%
                                        </div>
                                    </div>
                                    <div className="progress mb-30">
                                        <span>1 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 85%",
                                            }}
                                            aria-valuenow="85"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            85%
                                        </div>
                                    </div>
                                    <a href="#" className="font-xs text-muted">
                                        How are ratings calculated?
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="comment-form">
                            <h4 className="mb-15">Add a review</h4>
                            <div className="product-rate d-inline-block mb-30"></div>
                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    <form
                                        className="form-contact comment_form"
                                        action="#"
                                        id="commentForm"
                                    >
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control w-100"
                                                        name="comment"
                                                        id="comment"
                                                        cols="30"
                                                        rows="9"
                                                        placeholder="Write Comment"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="name"
                                                        id="name"
                                                        type="text"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="email"
                                                        id="email"
                                                        type="email"
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="website"
                                                        id="website"
                                                        type="text"
                                                        placeholder="Website"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="button button-contactForm"
                                            >
                                                Submit Review
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductTab;
