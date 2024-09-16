// utils/api.js

import axios from 'axios';
import storage from './localStorage';
import { clipDateOnly, getToken, getWebToken } from './util';
const username = process.env.NEXT_PUBLIC_API_USERNAME
const password = process.env.NEXT_PUBLIC_API_PASSWORD
const baseURL = 'https://admin.thepartycafe.com/tpc/App/V1'||process.env.NEXT_PUBLIC_BASE_URL

const auth = Buffer.from(`${username}:${password}`, 'utf-8').toString('base64');
// category page api's endpoints

export const getAllCategory = async () => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  try {
    const response = await axios.get(
      `${baseURL}/Product/getAllCategory`,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
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
export const getPriceRange = async ({ flag, sub_category, category, collection }) => {
  // Create a new FormData object
  const formData = new FormData();
  if(collection){
    formData.append('handle_collection', collection || "");
    formData.append('flag', 2);
  }else{
    formData.append('flag', 1);
    formData.append('handle_category', category);
    formData.append('handle_sub_category', sub_category);
  }
  try {
    const response = await axios.post(
      `${baseURL}/Product/getPriceRange`,
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

export const getAllCategoryProducts = async ({ handle_sub_category, handle_category, sort, page = 1, from_price, to_price, availabilityDate }) => {
  try {
    // Create a new FormData object
    const formData = new FormData();

    let flag = [];
    if(sort){
      flag.push(sort)
    }
    if (from_price || to_price) {
      flag.push("6");
    }
    if (availabilityDate) {
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
      formData.append('check_available_date', dateOnly);
    }
    
        formData.append('handle_sub_category', handle_sub_category);
        formData.append('handle_category', handle_category);
        formData.append('page', page);
        formData.append('from_price', from_price || "");
        formData.append('to_price', to_price || "");
        formData.append('flag', JSON.stringify(flag));



    const response = await axios.post(
      `${baseURL}/Product/getAllCategoryProducts`,
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

export const getAllCollectionProducts = async ({ handle, sort, page = 1, from_price, to_price, availabilityDate }) => {
  try {
    // Create a new FormData object
    const formData = new FormData();

    let flag = [];
    if(sort){
      flag.push(sort)
    }
    if (from_price || to_price) {
      flag.push("6");
    }
    formData.append('handle', handle);
    formData.append('page', page);
    formData.append('from_price', from_price || "");
    formData.append('to_price', to_price || "");
    formData.append('flag', JSON.stringify(flag));
    formData.append('check_available_date', "");
    if (availabilityDate) {
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
      formData.append('check_available_date', dateOnly || "");
    }
    
    const response = await axios.post(
      `${baseURL}/Product/getAllCollectionProducts`,
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
export const getSearchProducts = async (search_keyword) => {
  try {
    const auth_token = getToken();
    // Create a new FormData object
    const formData = new FormData();
    formData.append('search_keyword', search_keyword);
    
    const response = await axios.post(
      `${baseURL}/Product/searchProduct`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ }),
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


// Home page 

export const getHomeDetails = async () => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")

  try {
    const response = await axios.get(
      `${baseURL}/Home/getHomeData`,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
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


// Product details page api's endpoints
export const getProductDetails = async ({ handle }) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('handle', handle);
    
    const auth_token = getToken();
    const web_token = storage.get("web_token")
    const response = await axios.post(`${baseURL}/Product/getProductDetails`,
      formData,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data',
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
        }
      });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
};


// login and auth api's endpoints
export const logOutApi = async () => {
  
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  const formData = new FormData();
  formData.append('device', 'web');

  try {
    const response = await axios.post(
      `${baseURL}/Auth/logout`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to logout', error);
    throw error;
  }
}
export const loginApi = async (mobile) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    
  const auth_token = getToken();
  const web_token = storage.get("web_token")
    formData.append('mobile', mobile);

    const response = await axios.post(
      `${baseURL}/Auth/Login`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
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
export const updateTokenApi = async (auth_token) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    
    formData.append('token', 'HJDIWUR4354K');
    formData.append('device', 'web');

    const response = await axios.post(
      `${baseURL}/Auth/updateToken`,
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
    console.error('Failed to upadte token: ', error);
    throw error;
  }
}
export const registerApi = async ({ auth_token, name }) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('f_name', name);

    const response = await axios.post(
      `${baseURL}/Auth/userRegistration`,
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

export const verifyOTPApi = async ({ auth_token, otp }) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('otp', otp);
  const web_token = storage.get("web_token")
    const response = await axios.post(
      `${baseURL}/Auth/verifyOTP`,
      formData,
      {
        headers: {
          'auth_token': auth_token,
          'jwt': web_token,          
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
export const resendOTPApi = async (auth_token) => {
  try {
    
  const web_token = storage.get("web_token")
    const response = await axios.get(
      `${baseURL}/Auth/resendOTP`,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),          'Authorization': `Basic ${auth}`,
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


// Profile page api's endpoints

export const getProfileDetails = async (auth_token) => {
  try {
    const response = await axios.get(
      `${baseURL}/Auth/myProfile`,
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
export const downloadInvoice = async (orderId) => {
  const auth_token = getToken();
  try {
    const response = await axios.get(
      `${baseURL}/Invoice?order_id=${orderId}`,
      {
        headers: {
          'auth_token': auth_token,
          'Authorization': `Basic ${auth}`,
          'Accept': 'application/pdf' // Set the Accept header to 'application/pdf'
        },
        responseType: 'blob' // Set the responseType to 'blob'
      }
    );

    // Create a temporary URL for the PDF blob
    const pdfUrl = URL.createObjectURL(response.data);

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', `invoice_${orderId}.pdf`); // Set the download attribute with the desired file name

    // Append the anchor element to the document body
    document.body.appendChild(link);

    // Click the anchor element to initiate the download
    link.click();

    // Remove the anchor element from the document body
    document.body.removeChild(link);

    // Revoke the temporary URL to prevent memory leaks
    URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    console.error('Failed to download invoice', error);
    throw error;
  }
};

export const editProfileDetails = async ({ fullname, mobile, email, gender, dob, alternateMobile }) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('f_name', fullname);
  formData.append('mobile', mobile);
  formData.append('email', email);
  formData.append('gender', gender);
  formData.append('dob', dob || "");
  formData.append('alternate_mobile', alternateMobile);

  try {
    const response = await axios.post(
      `${baseURL}/Auth/editProfile`,
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
export const editPhoneNumber = async (mobile) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('mobile', mobile);
  formData.append('is_verified', 1);

  try {
    const response = await axios.post(
      `${baseURL}/Auth/editProfile`,
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
export const resendOTPForPhone = async (mobile) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('mobile', mobile);
  formData.append('is_verified', 1);

  try {
    const response = await axios.post(
      `${baseURL}/Auth/resendOTPProfile`,
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
export const verifyOTPforPhone = async ({mobile, otp}) => {
  const auth_token = getToken();
  const formData = new FormData();
  formData.append('mobile', mobile);
  formData.append('is_verified', 1);
  formData.append('otp', otp);
  try {

    const response = await axios.post(
      `${baseURL}/Auth/verifyOTP`,
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

export const editEmail = async (email) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('email', email);
  formData.append('is_verified', 2);

  try {
    const response = await axios.post(
      `${baseURL}/Auth/editProfile`,
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
export const resendOTPForEmail = async (email) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('email', email);
  formData.append('is_verified', 2);

  try {
    const response = await axios.get(
      `${baseURL}/Auth/resendOTP`,
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
export const verifyOTPforEmail = async ({email, otp}) => {
  const auth_token = getToken();
  const formData = new FormData();
  formData.append('email', email);
  formData.append('is_verified', 2);
  formData.append('otp', otp);
  try {

    const response = await axios.post(
      `${baseURL}/Auth/verifyOTP`,
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

// My adress api's endpoints
export const getAddressList = async () => {
  const auth_token = getToken();
  try {
    const response = await axios.get(
      `${baseURL}/Auth/userAddressList`,
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
export const addAddress = async ({ name
  , city
  , state_name
  , mobile
  , address_line_1
  , address_line_2
  , landmark
  , is_default
  , address_type
  , other_address_type_name
  , pincode }) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('name', name);
  formData.append('city', city);
  formData.append('state_name', state_name);
  formData.append('mobile', mobile);
  formData.append('address_line_1', address_line_1);
  formData.append('address_line_2', address_line_2);
  formData.append('landmark', landmark);
  formData.append('is_default', is_default);
  formData.append('address_type', address_type);
  formData.append('other_address_type_name', other_address_type_name);
  formData.append('pincode', pincode);
  try {
    const response = await axios.post(
      `${baseURL}/Auth/addUserAddress`,
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
export const checkDeliverablePincode = async ({ region_id, pincode }) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('region_id', region_id);
  formData.append('pincode', pincode);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/checkPincode`,
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
    throw error;
  }
}
export const editAddress = async ({ name
  , city
  , state_name
  , mobile
  , address_line_1
  , address_line_2
  , landmark
  , is_default
  , address_type
  , other_address_type_name
  , pincode
  , address_id }) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('name', name);
  formData.append('city', city);
  formData.append('state_name', state_name);
  formData.append('mobile', mobile);
  formData.append('address_line_1', address_line_1);
  formData.append('address_line_2', address_line_2);
  formData.append('landmark', landmark);
  formData.append('is_default', is_default);
  formData.append('address_type', address_type);
  formData.append('other_address_type_name', other_address_type_name);
  formData.append('pincode', pincode);
  formData.append('address_id', address_id);
  try {
    const response = await axios.post(
      `${baseURL}/Auth/editUserAddress`,
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

export const deleteAddress = async (address_id) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('address_id', address_id);
  try {
    const response = await axios.post(
      `${baseURL}/Auth/deleteUserAddress`,
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

export const getOrderList = async (pageNo=1) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('page', pageNo);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/getOrderList`,
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
export const getOrderDetails = async (order_id) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('order_id', order_id);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/getOrderDetails`,
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
    console.error('Failed to get order details', error);
    throw error;
  }
}
export const addNewsletter = async (email) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('email', email);
  try {
    const response = await axios.post(
      `${baseURL}/Auth/addNewsletter`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get order details', error);
    throw error;
  }
}
export const addContactUs = async ({email, name, mobile, subject, message}) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('mobile', mobile);
  formData.append('subject', subject);
  formData.append('message', message);
  try {
    const response = await axios.post(
      `${baseURL}/Auth/addContactUs`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get order details', error);
    throw error;
  }
}

export const checkRentalAvailability = async ({qty,end_date,start_date,product_id}) => {

  const auth_token = getToken();
  const web_token = storage.get("web_token")
    // Create a new FormData object
  const formData = new FormData();
  formData.append('product_id', product_id);
  formData.append('start_date', clipDateOnly(start_date));
  formData.append('end_date', clipDateOnly(end_date));
  formData.append('qty', qty);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/checkRentalAvailability`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get order details', error);
    throw error;
  }
}

export const getBlogs = async () => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  
  try {
    const response = await axios.get(
      `${baseURL}/Home/getAllBlogData`,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch', error);
    throw error;
  }
}
export const getBlogDetail = async ({blog_id}) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  
    // Create a new FormData object
    const formData = new FormData();
    formData.append('blog_id', blog_id);
    try {
      const response = await axios.post(
        `${baseURL}/Home/getBlogDetails`,
        formData,
        {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch', error);
    throw error;
  }
}

export const getFaqs = async () => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  
  try {
    const response = await axios.get(
      `${baseURL}/Auth/getFaq`,
      {
        headers: {
          // 'auth_token': "MZhVcdbJJbPD8CWpMUUnIw==",
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch', error);
    throw error;
  }
}
export const getCartList = async (page) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  
  try {
    const response = await axios.get(
      `${baseURL}/Transaction/cartProductList`,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
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
export const getWishlistList = async (page) => {
  const auth_token = getToken();

  const formData = new FormData();
  formData.append('page', page || 1);
  try {
    const response = await axios.post(
      `${baseURL}/Product/getUserWishlistProducts`,
      formData,
      {
        headers: {
          // 'auth_token': "MZhVcdbJJbPD8CWpMUUnIw==",
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
export const addToCart = async ({
  product_id,
qty,
mrp,
selling_price,
deposit_amount,
size,
color,
rental_start_date,
deduction_from_deposit_per_day,
rental_end_date
}) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('product_id', product_id);
  formData.append('qty', qty);
  formData.append('mrp', mrp);
  formData.append('size', size);
  formData.append('color', color);
  formData.append('selling_price', selling_price);
  formData.append('action', '1');
  formData.append('flag', '1');
  !auth_token &&  (formData.append('web_token', web_token));
  formData.append('deposit_amount', deposit_amount);
  formData.append('rental_start_date', clipDateOnly(rental_start_date));
  formData.append('deduction_from_deposit_per_day', deduction_from_deposit_per_day);
  formData.append('rental_end_date', clipDateOnly(rental_end_date));
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/addToCart`,
      formData,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data',
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
}
export const addToWishlist = async (product_id) => {
  const auth_token = getToken();
  // Create a new FormData object
  const formData = new FormData();
  formData.append('product_id', product_id);
  try {
    const response = await axios.post(
      `${baseURL}/Product/addToWishlist`,
      formData,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data',
          'auth_token': auth_token,
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
}

export const deleteFromCart = async (
  {product_id,
    cart_id,}
) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('product_id', product_id);
  formData.append('cart_id', cart_id);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/removeCartProduct`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
}

export const deleteFromWishlist = async (
  {product_id}
) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('product_id', product_id);
  formData.append('cart_id', cart_id);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/removeWishlistProduct`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}


export const selectShippingAddress = async (
  {address_id, billing_address_id, cart_id}
) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('billing_address_id', billing_address_id);
  formData.append('address_id', address_id);
  formData.append('cart_id', cart_id);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/removeCartProduct`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error!', error);
    throw error;
  }
}
export const selectBillingAddress = async (
  {address_id,billing_address_id,cart_id}
) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('address_id', address_id);
  formData.append('billing_address_id', billing_address_id);
  formData.append('cart_id', cart_id);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/removeCartProduct`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error!', error);
    throw error;
  }
}
export const setGst = async (
  {gst_number,cart_id,companyName}
) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('gst_number', gst_number?gst_number:"");
  formData.append('cart_id', cart_id);
  formData.append('is_gst_add', 1);
formData.append('company_name', companyName);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/removeCartProduct`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error!', error);
    throw error;
  }
}

export const applyCouponApi = async (coupon) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('coupon_code', coupon);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/applyCoupon`,
      formData,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error!', error);
    throw error;
  }
}
export const removeCouponApi = async (coupon) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  try {
    const response = await axios.get(
      `${baseURL}/Transaction/removeCoupon`,
      {
        headers: {
          ...(auth_token ? { 'auth_token': auth_token }:{ 'jwt': web_token }),
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data' // This line is important for axios to handle FormData correctly
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error!', error);
    throw error;
  }
}
export const placeOrder = async ({address_id, billing_address_id, payment_type, transaction_id, payment_method_name, order_id, payment_method_type}) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('flag', '1');
  formData.append('address_id', address_id);
  formData.append('billing_address_id', billing_address_id);
  formData.append('payment_type', payment_type);
  formData.append('transaction_id', transaction_id);
  formData.append('order_id', order_id);
  formData.append('payment_method_type', payment_method_type);
  formData.append('payment_method_name', payment_method_name);
  // formData.append('delivery_date', '12-07-2024');
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/placeOrder`,
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
    console.error('Error!', error);
    throw error;
  }
}
export const createPaymentLink = async ({address_id, billing_address_id, payment_type, transaction_id}) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('flag', '1');
  formData.append('address_id', address_id);
  formData.append('billing_address_id', billing_address_id);
  formData.append('payment_type', payment_type);
  formData.append('transaction_id', transaction_id);
  // formData.append('delivery_date', '12-07-2024');
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/createPaymentLink`,
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
    console.error('Error!', error);
    throw error;
  }
}

export const checkPaymentStatus = async (order_id) => {
  const auth_token = getToken();
  const web_token = storage.get("web_token")
  // Create a new FormData object
  const formData = new FormData();
  formData.append('order_id', order_id);
  try {
    const response = await axios.post(
      `${baseURL}/Transaction/checkOrderStatus`,
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
    console.error('Error!', error);
    throw error;
  }
}
