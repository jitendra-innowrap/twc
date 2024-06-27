import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import BrandFilter from "../../components/ecommerce/BrandFilter";
import CategoryProduct from "../../components/ecommerce/CategoryProduct";
import Pagination from "../../components/ecommerce/Pagination";
import PriceRangeSlider from "../../components/ecommerce/PriceRangeSlider";
import QuickView from "../../components/ecommerce/QuickView";
import ShowSelect from "../../components/ecommerce/ShowSelect";
import SingleProduct from "../../components/ecommerce/SingleProduct";
import SingleProductList from "../../components/ecommerce/SingleProductList";
import SizeFilter from "../../components/ecommerce/SizeFilter";
import SortSelect from "../../components/ecommerce/SortSelect";
import WishlistModal from "../../components/ecommerce/WishlistModal";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import ReactDatePicker from "react-datepicker";
import { getAllCategoryProducts } from "../../util/api";
import { fetchMoreProduct, fetchProduct } from "../../redux/action/product";
import { openCart } from "../../redux/action/cart";
import Preloader from "../../components/elements/Preloader";

const Products = ({ products, productFilters }) => {
    let today = new Date();
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [calendarStartDate, setCalendarStartDate] = useState(new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000)))
    const [calendarEndDate, setCalendarEndDate] = useState(new Date(today.getTime() + (120 * 24 * 60 * 60 * 1000)))
    const [productList, setProductList] = useState([]);
    const [sub_categories, setSub_categories] = useState([]);
    const [deliveryDate, setDeliveryDate] = useState();
    let Router = useRouter(),
        searchTerm = Router.query.search,
        showLimit =20,
        showPagination = 4;
    const [filters, setFilters] = useState({
        page: 1,
        from_price: null,
        to_price: null,
        sort: null,
    });
    const {category, sub_category, page, from_price, to_price, sort } = Router.query;

  useEffect(() => {
    // Initialize filters from query parameters
    setFilters({
      page: page ? parseInt(page) : 1,
      from_price: from_price ? parseFloat(from_price) : null,
      to_price: to_price ? parseFloat(to_price) : null,
      sort: sort || "1",
    });
  }, [Router.query]);

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
        if(value)
        return(<button className="custom-date-input" onClick={onClick} ref={ref}>
            {value}
        </button>)
        else{
        return<div onClick={onClick} className="custom-date-input">
            <span>Select Date</span> <i></i>
        </div>
        }
    });
    
    const [listLayout, setListLayout] = useState(false)
    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    let [pages, setPages] = useState(Math.ceil(totalProducts / limit));
    let [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchProductList()
    }, [filters]);
    
    useEffect(() => {
      
        cratePagination();
    
    }, [totalProducts])
    
    const fetchProductList = async ()=>{
        const { category, sub_category } = Router.query; // Extract category and sub_category from URL params

        // Create the request body
        let body = { handle_category: category || "", handle_sub_category: sub_category || "", ...filters };
        try {
                const response = await getAllCategoryProducts(body);
                console.log('fetch products success: ', response)
                if(response.code==0){
                    Router.push('/404')
                }
                setProductList(response?.result);
                setSub_categories(response?.sub_categories);
                setTotalProducts(response?.total_products);
                setIsLoading(false);
            } catch (error) {
                console.error('there is an error: ',error);
                
            }
    }

    const cratePagination = () => {
        // set pagination
        let arr = Array.from({ length: Math.ceil(totalProducts / limit) }, (_, idx) => idx + 1);
      
        setPagination(arr);
        setPages(Math.ceil(totalProducts / limit));
      };
      

    const handleClearFilters = () =>{
        setDeliveryDate()
    }

    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;
    const getPaginatedProducts = productList?.slice(startIndex, endIndex);

    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
    const getPaginationGroup = pagination?.slice(start, end);

    const next = () => {
        setCurrentPage((page) => page + 1);
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
    };

    const handleActive = (item) => {
        setCurrentPage(item);
        Router.replace({
            query: { ...Router.query, page:item },
            });
    };


    
    return (
        <>
            <Layout parent="Home" sub={category} subChild={sub_category}>
                <section className="mt-50 mb-50">
                    <div className="container">
                        {isLoading?
                        <Preloader />
                        :
                        <div className="row">
                            <div className="col-lg-3 primary-sidebar sticky-sidebar">
                                <div className="widget-category mb-30">
                                    <h5 className="section-title style-1 mb-30 wow fadeIn animated">
                                        Category
                                    </h5>
                                    <CategoryProduct sub_categories={sub_categories} />
                                </div>

                                <div className="sidebar-widget price_range range mb-30">
                                    <div className="widget-header position-relative mb-20 pb-10">
                                        <h5 className="widget-title mb-10">
                                            Fillter by
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
                                            <label className="fw-900 mt-20 mb-15">
                                                Size
                                            </label>
                                            <SizeFilter />
                                            <label className="fw-900 mt-35 mb-15">
                                                Availablity Date
                                            </label>
                                            <div className="date-filter">
                                                <ReactDatePicker
                                                    selected={deliveryDate}
                                                    dateFormat="dd/MM/yyyy"
                                                    onChange={(date) => setDeliveryDate(date)}
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
                                {productList.length > 0 && <div className="shop-product-fillter">
                                    <div className="totall-product">
                                        <p>
                                            We found
                                            <strong className="text-brand">
                                                {productList?.length}
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
                                    {productList.length === 0 && (
                                        <div className="no-products-found">
                                            <img src="/assets/imgs/theme/no-products.png" alt="no products found" />
                                            {/* <h3> No Products Found </h3> */}
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
                                            next={next}
                                            prev={prev}
                                            handleActive={handleActive}
                                        />
                                    </nav>
                                </div>}
                            </div>
                        </div>
                        }
                    </div>
                </section>
                {/* <WishlistModal /> */}
                {/* <CompareModal /> */}
                {/* <CartSidebar /> */}
                {/* <QuickView />                 */}
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products,
    productFilters: state.productFilters,
});

const mapDidpatchToProps = {
    openCart,
    fetchProduct,
    fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
