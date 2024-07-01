import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../redux/action/productFiltersAction";

const SortSelect = ({ updateProductFilters }) => {
    const router = useRouter();
    const searchTerm = router.query.search;
    const [featured, setFeatured] = useState("default");
    const [selectedOption, setSelectedOption] = useState("");
    const [showOptions, setShowOptions] = useState(false)
    const options = [
        { value: "", text: "Default" },
        { value: "1", text: "Price: Low to High" },
        { value: "2", text: "Price: High to Low" },
        { value: "3", text: "What's New" },
        { value: "4", text: "Trending" },
        { value: "5", text: "Best Seller" },
    ];

    useEffect(() => {
        const { sort } = router.query;
        const selectedOption = options.find((item) => item.value === sort);
        setFeatured(selectedOption?.text || "default");
        setSelectedOption(sort || "");
      }, [router.query, options]);
    
    const handleChange = (e) => {
        const flag = e.currentTarget.getAttribute('flag');
        const data = e.currentTarget.getAttribute('data');
        setFeatured(data);
        setSelectedOption(flag);
        setShowOptions(false);

        router.replace({
        query: { ...router.query, sort: flag, page:1 },
        });

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
                                onClick={handleChange}
                                flag={option.value}
                                data={option.text}
                                className={selectedOption == option.value ? "selected" : ""}
                            >
                                {option.text}
                                <span>
                                    {selectedOption == option.value && <i className="fi-rs-check ml-0"></i>}
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
