import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../redux/action/productFiltersAction";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceRangeSlider = ({ updateProductFilters }) => {
    
    const router = useRouter();
    const searchTerm = router.query.search;

    const [price, setPrice] = useState({ value: { min: router.query.from_price || 0, max: router.query.to_price || 25000 } });

    useEffect(() => {
        
    }, [price, searchTerm]);

    const handleChange =(value)=>{
        router.replace({
            query: { ...router.query, from_price: value[0], to_price: value[1] },
            });
    }
    return (
        <div className="evara_price_slider_amount">
            <Slider
                range
                allowCross={false}
                defaultValue={[price.value.min, price.value.max]}
                min={0}
                max={25000}
                onAfterChange={(value) => handleChange(value)} 
                onChange={(value) => setPrice({ value: { min: value[0], max: value[1] } })}
            />

            <div className="d-flex justify-content-between">
                <span>
                    {price.value.min}
                </span>
                <span>
                    {price.value.max}
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    products: state.products.items,
});

const mapDidpatchToProps = {
    updateProductFilters,
};

export default connect(mapStateToProps, mapDidpatchToProps)(PriceRangeSlider);
