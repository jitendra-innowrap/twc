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
    const [ProductDetails, setProductDetails] = useState({});
    useEffect(() => {
        fetchDetails();
    }, [])
    
    const fetchDetails = async ()=>{
        const username = 'PLKT-,9_d63YGYIc87(^5';
        const password = 'PLKRn72^8YKqRip8v^a#|';
        const auth = Buffer.from(`${username}:${password}`, 'utf-8').toString('base64');

        try {
            // Create a new FormData object
            const formData = new FormData();
            formData.append('handle', "colorful_pattern_shirts");
        
            const response = await axios.post(
              'https://innowrap.co.in/clients/twc/App/V1/Product/getProductDetails',
              formData,
              {
                headers: {
                  'Authorization': `Basic ${auth}`,
                  'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
                }
              }
            );
            console.log(response)
            return response.data;
          } catch (error) {
            console.error('Failed to fetch data', error);
            throw error;
          }
    }
    return (
        <>
        <Layout parent="Home" sub="Shop" subChild={product?.title}>
            <div className="container" onClick={()=> {fetchDetails(), console.log("clicked")}}>
                {/* <ProductDetails product={product} /> */}
            </div>
        </Layout>
        </>
    );
};


ProductId.getInitialProps = async (params) => {
    
    const request = await fetch(`${server}/static/product.json`);
    const data = await request.json();

    const index = findProductIndex(data, params.query.slug);
    // console.log(params);

    return { product: data[index] };
};

export default ProductId;
