import React, { useEffect, useState } from "react";
import Layout from '../../../components/layout/Layout';
import { getProductDetails } from "../../../util/api";
import { useRouter } from "next/router";
import axios from "axios";
import ProductDetails from "../../../components/ecommerce/ProductDetails";

const ProductId = ({ product }) => {
    const router = useRouter();
    const { _v2, _v1, slug } = router.query;
    const [details, setDetails] = useState({});
    useEffect(() => {
        fetchDetails();
    }, [slug, _v2, _v1])
    
    const fetchDetails = async ()=>{
        const response = await getProductDetails({handle:slug, option_value_1:_v1, option_value_2:_v2});
        console.clear()
        if(response.code==0){
          router.push('/404')
      }
        setDetails(response)
    }
    return (
        <>
        <Layout parent="Home" sub={details?.result?.[0]?.sub_category_name} subChild={details?.result?.[0]?.name}>
            <div className="container">
                <ProductDetails product={details} />
            </div>
        </Layout>
        </>
    );
};


ProductId.getInitialProps = async (params) => {

    return { product: {} };
};

export default ProductId;
