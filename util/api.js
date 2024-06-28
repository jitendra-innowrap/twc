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
export const getPriceRange = async ({flag, sub_category, category, collection}) => {
  // Create a new FormData object
  const formData = new FormData();
  formData.append('flag', flag || 1);
  formData.append('handle_category', category || "wedding");
  formData.append('handle_sub_category', sub_category || "outfits");
  // formData.append('handle_collection', collection || "");
  try {
      const response = await axios.post(
        'https://innowrap.co.in/clients/twc/App/V1/Product/getPriceRange',
        formData,
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
          }
        }
      );
    return response;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
};

export const getAllCategoryProducts = async ({handle_sub_category, handle_category, sort, page=1, from_price, to_price, availabilityDate}) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    let flag = [sort || ""];
    if (from_price || to_price) {
      flag.push("6");
    }
    if (availabilityDate){
      flag.push("7");
      // Assuming you have a datetime string like '"2024-07-18T18:30:00.000Z"'
      const datetimeString = availabilityDate;

      // Remove extra quotes if they exist
      const cleanedDatetimeString = datetimeString.replace(/^"|"$/g, '');

      // Create a new Date object from the cleaned datetime string
      const tempdate = new Date(cleanedDatetimeString);

      // Extract only the date part in 'YYYY-MM-DD' format
      const dateOnly = tempdate.toISOString().split('T')[0];

    // Append the date-only string to the form data
    formData.append('check_available_date', dateOnly );
    }



    formData.append('handle_sub_category', handle_sub_category);
    formData.append('handle_category', handle_category);
    formData.append('page', page);
    formData.append('from_price', from_price || "");
    formData.append('to_price', to_price || "");
    formData.append('flag', JSON.stringify(flag));

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

export const loginApi = async (mobile)=>{
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('mobile', mobile);

    const response = await axios.post(
      'https://innowrap.co.in/clients/twc/App/V1/Auth/Login',
      formData, 
      {
        headers: {
          'auth_token': 'Qw9lMNjXYVQqKqzTwAzR0L==',
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
}
export const registerApi = async ({auth_token, name})=>{
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('f_name', name);

    const response = await axios.post(
      'https://innowrap.co.in/clients/twc/App/V1/Auth/userRegistration',
      formData, 
      {
        headers: {
          'auth_token': auth_token,
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
}

export const verifyOTPApi = async ({auth_token, otp})=>{
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('otp', otp);

    const response = await axios.post(
      'https://innowrap.co.in/clients/twc/App/V1/Auth/verifyOTP',
      formData, 
      {
        headers: {
          'auth_token': auth_token,
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
}
export const resendOTPApi = async (auth_token)=>{
  try {

    const response = await axios.get(
      'https://innowrap.co.in/clients/twc/App/V1/Auth/resendOTP',
      {
        headers: {
          'auth_token': auth_token,
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
}


