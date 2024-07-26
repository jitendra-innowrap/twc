import React, { useEffect, useState } from "react";
// import { fetchByCatagory } from "../../redux/action/product";
import { server } from "../../config/index";
import FeaturedSlider from "../sliders/Featured";

function FeatchTabSlider({data}) {
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="arrow-center position-relative">
                        <FeaturedSlider products={data} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default FeatchTabSlider;
