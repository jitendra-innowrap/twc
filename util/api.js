// utils/api.js

import axios from 'axios';

const username = 'PLKT-,9_d63YGYIc87(^5';
const password = 'PLKRn72^8YKqRip8v^a#|';
const auth = Buffer.from(`${username}:${password}`, 'utf-8').toString('base64');

export const getAllCategory = async () => {
  try {
    const response = await axios.get('https://innowrap.co.in/clients/twc/App/V1/Product/getAllCategory', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
        // Add any other headers you need here
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
};

export const getAllCategoryProducts = async ({handle_sub_category, handle_category, sort, page=1, from_price, to_price}) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('handle_sub_category', handle_sub_category);
    formData.append('handle_category', handle_category);
    formData.append('page', page);
    formData.append('from_price', from_price);
    formData.append('to_price', to_price);
    formData.append('flag', JSON.stringify([sort]) || JSON.stringify([]));

    const response = await axios.post(
      'https://innowrap.co.in/clients/twc/App/V1/Product/getAllCategoryProducts',
      formData,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
};


export const getProductDetails = async ({handle}) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('handle', handle);

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
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
};


