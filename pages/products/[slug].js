import React, { useEffect, useState } from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from '../../components/layout/Layout';
import { server } from "../../config/index";
import { findProductIndex } from "../../util/util";
import { getProductDetails } from "../../util/api";
import { useRouter } from "next/router";
import axios from "axios";

const ProductId = ({ product }) => {
    const router = useRouter();
    const {slug} = router.query;
    const [details, setDetails] = useState({});
    useEffect(() => {
        fetchDetails();
    }, [slug])
    
    const fetchDetails = async ()=>{
        const response = await getProductDetails({handle:slug})
        if(response.code==0){
          router.push('/404')
      }
        setDetails(response)
    }
    return (
        <>
        <Layout parent="Home" sub={details?.result?.[0]?.sub_category_name} subChild={details?.result?.[0]?.name}>
            <div className="container" onClick={()=> {console.log("clicked", details)}}>
                <ProductDetails product={details} />
            </div>
        </Layout>
        </>
    );
};


ProductId.getInitialProps = async (params) => {
    
    // const request = await fetch(`${server}/static/product.json`);
    // const data = await request.json();

    // const index = findProductIndex(data, params.query.slug);
    // console.log(params);

    return { product: {} };
};

export default ProductId;
