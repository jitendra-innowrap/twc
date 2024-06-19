import React, { useEffect, useState } from "react";
// import { fetchByCatagory } from "../../redux/action/product";
import { server } from "../../config/index";
import FeaturedSlider from "../sliders/Featured";

function FeatchTabSlider() {
    const [active, setActive] = useState("1");
    const [featured, setFeatured] = useState([]);

    const featuredProduct = async () => {
        const request = await fetch(`${server}/static/product.json`);
        const allProducts = await request.json();
        const featuedItem = allProducts.filter((item) => item.featured);
        setFeatured(featuedItem);
        setActive("1");
    };

    useEffect(() => {
        featuredProduct();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="arrow-center position-relative">
                        <FeaturedSlider products={featured} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default FeatchTabSlider;
