import React, { forwardRef, useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import CategoryProduct from './CategoryProduct'
import PriceRangeSlider from './PriceRangeSlider'
import SizeFilter from './SizeFilter'
import ReactDatePicker from 'react-datepicker'
import { useRouter } from 'next/router'

export default function FiltersMobile({ sub_categories, filterOpen, toggleFilter, deliveryDate, handleDateFilter, calendarStartDate, calendarEndDate, handleClearFilters }) {
    const router = useRouter();
    const [selectedSub_category, setselectedSub_category] = useState("")
    const [Filters, setFilters] = useState({
        category: '',
        size: '',
        price: { from_price: "", to_price: "" },
        availabilityDate: ''
    })
    const { from_price, to_price, category, sub_category, size, slug, availabilityDate } = router.query;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        let formattedDate
        if(sub_category){
            setselectedSub_category(sub_category);
        }
        if(availabilityDate){
            const parsedDate = new Date(JSON.parse(availabilityDate));
             formattedDate = parsedDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
        }
        setFilters({
            size,
            from_price: from_price,
            to_price: to_price,
            availabilityDate: formattedDate,
        })
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [router.query])

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

    const clearAllFilters=()=>{
        handleClearFilters();
        toggleFilter();
    }
    const handleDate=(date)=>{
        let realDate = date;
        if(!availabilityDate){
            realDate = new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000));
        }

        setFilters(
            (prev)=>({
                ...prev,
                availabilityDate:realDate
            })
        )
    }
    const handleApplyFilters =()=>{
        const updatedQuery = {
            page: 1, // Always include the page parameter
        };
        
        // Conditionally add filters that are not empty
        if (Filters.from_price) {
            updatedQuery.from_price = Filters.from_price;
        }
        
        if (Filters.to_price) {
            updatedQuery.to_price = Filters.to_price;
        }
        
        if (Filters.size) {
            updatedQuery.size = Filters.size;
        }
        
        if (Filters.availabilityDate) {
            updatedQuery.availabilityDate = JSON.stringify(Filters.availabilityDate);
        }
        
        // Replace the router query with the updated query
        if(sub_categories){
            router.push({
                pathname:`/products/${category}/${selectedSub_category}`,
                query: updatedQuery,
                
            });
        }else{
            router.push({
                pathname:`/collection/${slug}`,
                query: updatedQuery,    
            });
        }
        toggleFilter();
        
    }


    return (<>
    <div style={{zIndex:'99999999'}} className="filter-actions-btns d-flex">
                <div onClick={clearAllFilters} className="button d-flex align-items-center justify-content-center"><i className="fi-rs-cross"></i> <span className="ml-15">Clear</span></div>
                <div onClick={handleApplyFilters} className="button d-flex align-items-center justify-content-center"><i className="fi-rs-filter"></i> <span className="ml-15">Apply</span></div>
                </div>
        <div className={`col-lg-3 primary-sidebar sticky-sidebar ${filterOpen ? 'filter-sidebar active-sidebar' : 'filter-sidebar'}`}>
            <div className="filters-Wrapper">
            {sub_categories && <div className="widget-category mb-30">
                <h5 className="section-title style-1 mb-30 wow fadeIn animated">
                    Category
                </h5>
                <CategoryProduct mobile setselectedSub_category={setselectedSub_category} selectedSub_category={selectedSub_category} sub_categories={sub_categories} />
            </div>}

            <div className={`sidebar-widget  price_range range mb-30 ${!sub_categories && 'mt-70'}`}>
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
                        <PriceRangeSlider mobile setFilters={setFilters} />
                        {/* <br /> */}
                    </div>
                </div>

                <div className="list-group">
                    <div className="list-group-item mb-10">
                        {/* <label className="fw-900 mt-20 mb-15">
                            Size
                        </label>
                        <SizeFilter mobile setFilters={setFilters} /> */}
                        <label className="fw-900 mt-35 mb-15">
                            Availablity Date
                        </label>
                        <div className="date-filter">
                            <ReactDatePicker
                                selected={Filters.availabilityDate}
                                dateFormat="dd/MM/yyyy"
                                onChange={(date) => 
                                    handleDate(date)
                                }
                                popperPlacement="top"
                                customInput={<ExampleCustomInput />}
                                minDate={calendarStartDate}
                                maxDate={calendarEndDate}
                            />
                        </div>
                    </div>
                </div>

            </div>
            </div>
            <div className="filter-close-btn">
                <div className="title">Filters</div>
                <span onClick={toggleFilter}><MdOutlineClose color="#000" fontSize={24} /></span>
            </div>
        </div>
        </>
    )
}
