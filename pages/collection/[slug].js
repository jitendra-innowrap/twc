import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import CategoryProduct from "../../components/ecommerce/CategoryProduct";
import Pagination from "../../components/ecommerce/Pagination";
import PriceRangeSlider from "../../components/ecommerce/PriceRangeSlider";
import SingleProduct from "../../components/ecommerce/SingleProduct";
import SingleProductList from "../../components/ecommerce/SingleProductList";
import SizeFilter from "../../components/ecommerce/SizeFilter";
import SortSelect from "../../components/ecommerce/SortSelect";
import Layout from "../../components/layout/Layout";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Preloader from "../../components/elements/Preloader";
import { getAllCollectionProducts } from "../../util/api";

const Products = () => {
    let today = new Date();
    let Router = useRouter(),
    searchTerm = Router.query.search,
    showLimit =20,
    showPagination = 4;
    const { slug, page, from_price, to_price, sort, availabilityDate } = Router.query;
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [calendarStartDate, setCalendarStartDate] = useState(new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)))
    const [calendarEndDate, setCalendarEndDate] = useState(new Date(today.getTime() + (120 * 24 * 60 * 60 * 1000)))
    const [productList, setProductList] = useState([]);
    const [title, setTitle] = useState("");
    let formattedDate
    if(availabilityDate){
        const parsedDate = new Date(JSON.parse(availabilityDate));
         formattedDate = parsedDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    }
    const [deliveryDate, setDeliveryDate] = useState(availabilityDate?formattedDate:"");
    const [listLayout, setListLayout] = useState(false)
    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    let [pages, setPages] = useState(Math.ceil(totalProducts / limit));
    let [currentPage, setCurrentPage] = useState(1);

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
        if (value)
            return (<button className="custom-date-input" onClick={onClick} ref={ref}>
                {value}
            </button>)
        else {
            return <div onClick={onClick} className="custom-date-input">
                <span>Select Date</span> <i></i>
            </div>
        }
    });


    useEffect(() => {
        if(slug){
        fetchProductList();
        setCurrentPage(page||1);
        }
    }, [Router.query]);

    useEffect(() => {
        cratePagination();
    }, [totalProducts])

    const fetchProductList = async () => {
        // Create the request body
        let body = { handle: slug || "", sort, page, from_price, to_price, availabilityDate  };
        try {
            const response = await getAllCollectionProducts(body);
            console.log('fetch products success: ', response)
            if (response.code == 0) {
                Router.push('/404')
            }
            setProductList(response?.result);
            setTitle(response?.collections_info?.[0]?.title);
            console.log('title',response?.collections_info?.title)
            setTotalProducts(response?.total_products);
            setIsLoading(false);
        } catch (error) {
            console.error('there is an error: ', error);

        }
    }

    const cratePagination = () => {
        // set pagination
        let arr = Array.from({ length: Math.ceil(totalProducts / limit) }, (_, idx) => idx + 1);
        
        setPagination(arr);
        setPages(Math.ceil(totalProducts / limit));
      };
      

    const handleClearFilters = () =>{
        setDeliveryDate();
        Router.replace({
            query: { ...Router.query, size: "all", availabilityDate:"", from_price:"", to_price:"", page:1 },
            });
    }

    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;

    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
    const getPaginationGroup = pagination?.slice(start, end);

    const handleActive = (item) => {
        setCurrentPage(item);
        Router.replace({
            query: { ...Router.query, page:item },
            });
    };

    const handleDateFilter = (date) =>{
        setDeliveryDate(date);
        Router.replace({
            query: { ...Router.query, availabilityDate: JSON.stringify(date), page:1 },
            });
    }

    
    return (
        <>
            <Layout parent="Home" sub={"collection"} subChild={title}>
                <section className="mt-50 mb-50">
                    <div className="container">
                        {isLoading?
                        <Preloader />
                        :
                        <div className="row">
                            <div className="col-lg-3 primary-sidebar sticky-sidebar">
                                <div className="sidebar-widget price_range range mb-30">
                                    <div className="widget-header position-relative mb-20 pb-10">
                                        <h5 className="widget-title mb-10">
                                            Filter by
                                        </h5>
                                        <div className="bt-1 border-color-1"></div>
                                    </div>

                                    <div className="price-filter">
                                    <label className="fw-900 mt-20 mb-15">
                                                Price
                                            </label>
                                        <div className="price-filter-inner">
                                            <br />
                                            <PriceRangeSlider />
                                            <br />
                                        </div>
                                    </div>

                                    <div className="list-group">
                                        <div className="list-group-item mb-10">
                                            {/* <label className="fw-900 mt-20 mb-15">
                                                Size
                                            </label>
                                            <SizeFilter /> */}
                                            <label className="fw-900 mb-15">
                                                Availablity Date
                                            </label>
                                            <div className="date-filter">
                                                <ReactDatePicker
                                                    selected={deliveryDate}
                                                    dateFormat="dd/MM/yyyy"
                                                    onChange={(date) => handleDateFilter(date)}
                                                    customInput={<ExampleCustomInput />}
                                                    minDate={calendarStartDate}
                                                    maxDate={calendarEndDate}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div onClick={handleClearFilters} className="button d-flex align-items-center justify-content-center"><i className="fi-rs-cross"></i> <span className="ml-15">Clear Filters</span></div>
                                </div>

                                {/* <div className="banner-img wow fadeIn mb-45 animated d-lg-block d-none">
                                    <img
                                        src="/assets/imgs/banner/banner-offer.webp"
                                        alt=""
                                    />
                                    <div className="banner-text">
                                        <span>Women Zone</span>
                                        <h4>
                                            Save 17% on <br />
                                            Office Dress
                                        </h4>
                                        <Link href="/products">
                                            <a>
                                                Shop Now
                                                <i className="fi-rs-arrow-right"></i>
                                            </a>
                                        </Link>
                                    </div>
                                </div> */}
                            </div>
                            <div className="col-lg-9">
                                {productList?.length > 0 && <div className="shop-product-fillter">
                                    <div className="totall-product">
                                        <p>
                                            We found
                                            <strong className="text-brand">
                                                {totalProducts}
                                            </strong>
                                            items for you!
                                        </p>
                                    </div>
                                    <div className="sort-by-product-area">
                                        <div className="sort-by-cover">
                                            <SortSelect />
                                        </div>
                                        {/* <div className="change-List-layout" onClick={handleLayout}>
                                            <span>
                                                {listLayout?<i className="fi-rs-grid"></i>:<i className="fi-rs-list"></i>}
                                            </span>
                                        </div> */}
                                    </div>
                                </div>}
                                <div className="row product-grid-3">
                                    {productList?.length === 0 && (
                                        <div className="no-products-found">
                                            <img src="/assets/imgs/theme/no-products.png" alt="no products found" />
                                        </div>
                                    )}

                                    {productList?.map((item, i) => {
                                        if(listLayout){
                                            return<div className=""
                                            key={i}
                                        >
                                            <SingleProductList product={item}/>
                                        </div>                                        
                                        }else{
                                            return <div className="col-lg-4 col-md-4 col-12 col-sm-6"
                                            key={i}
                                            >
                                            <SingleProduct product={item} />
                                        </div>
                                        }
                                    })}
                                </div>

                                { <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                                    <nav aria-label="Page navigation example">
                                        <Pagination
                                            getPaginationGroup={
                                                getPaginationGroup
                                            }
                                            currentPage={currentPage}
                                            pages={pages}
                                            handleActive={handleActive}
                                        />
                                    </nav>
                                </div>}
                            </div>
                        </div>
                        }
                    </div>
                </section>
            </Layout>
        </>
    );
};


export default Products;
