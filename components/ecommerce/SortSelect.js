import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../redux/action/productFiltersAction";

const SortSelect = ({ updateProductFilters }) => {
    const Router = useRouter();
    const searchTerm = Router.query.search;
    const [featured, setFeatured] = useState("Price: High to Low");
    const [selectedOption, setSelectedOption] = useState("Price: High to Low");
    const [showOptions, setShowOptions] = useState(false)
    const options = [
        { value: "Price: High to Low", text: "Price: High to Low" },
        { value: "Price: Low to High", text: "Price: Low to High" },
        { value: "What's New", text: "What's New" },
        { value: "Trending", text: "Trending" },
        { value: "Best Seller", text: "Best Seller" },
    ];
    useEffect(() => {
        const filters = {
            featured,
        };

        updateProductFilters(filters);
    }, [searchTerm, featured]);

    const handleChange = (e) => {
        setFeatured(e.target.value);
        setShowOptions(false)
    };

    return (
        <>
            <div className="sort-by-product-wrap">
                <div className="sort-by d-flex justify-content-between w-100" onMouseEnter={()=>{setShowOptions(true)}}>
                    <div>
                        <i className="fi-rs-apps-sort mr-10"></i>
                        Sort by:
                        <span className="ml-15 fw-bold">{featured}</span>
                    </div>
                    <span className="chev"><i className="fi-rs-angle-down"></i></span>
                </div>
                {showOptions && <div className="sort-by-dropdown-wrap custom-select">
                    <ul>
                    {options.map((option) => (
                            <li
                                key={option.value}
                                onChange={handleChange}
                                value={option.value}
                                className={selectedOption === option.value ? "selected" : ""}
                            >
                                {option.text}
                                <span>
                                    {selectedOption === option.value && <i className="fi-rs-check ml-0"></i>}
                                </span>
                            </li>
                    ))}    
                    </ul>
                </div>}
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products.items,
});

const mapDidpatchToProps = {
    updateProductFilters,
};

export default connect(mapStateToProps, mapDidpatchToProps)(SortSelect);
