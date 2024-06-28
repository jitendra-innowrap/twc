import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../redux/action/productFiltersAction";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getPriceRange } from "../../util/api";

const PriceRangeSlider = () => {
    
    const router = useRouter();
    const { from_price, to_price } = router.query;
    const [price, setPrice] = useState({ value: { min: from_price || 0, max: to_price || 25000 } });
    const [priceRange, setPriceRange] = useState({min:0,max:0})
    useEffect(() => {
        fetchPriceRange();
    }, [router.query]);

    const fetchPriceRange= async()=>{
        const res = await getPriceRange({})
        const min = parseInt(res?.data?.result?.[0].price_min) || 0;
        const max = parseInt(res?.data?.result?.[0].price_max) || 25000;
        setPriceRange({min,max})
        setPrice({ value: { min: from_price || min, max: to_price || max } })
    }

    const handleChange =(value)=>{
        router.replace({
            query: { ...router.query, from_price: value[0], to_price: value[1], page:1 },
            });
    }
    return (
        <div className="evara_price_slider_amount">
            <Slider
                range
                allowCross={false}
                value={[price.value.min, price.value.max]}
                min={priceRange.min}
                max={priceRange.max}
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
