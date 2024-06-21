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

export const getAllCategoryProducts = async ({handle_sub_category, handle_category, flag}) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('handle_sub_category', handle_sub_category);
    formData.append('handle_category', handle_category);
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




// export const getAllCategoryProducts = async ({handle_sub_category, handle_category, flag}) => {
//   try {
//     const response = await axios.post('https://innowrap.co.in/clients/twc/App/V1/Product/getAllCategoryProducts', 
//     {
//       handle_sub_category,
//       handle_category,
//       flag
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${auth}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch data', error);
//     throw error;
//   }

//   axios.post('https://innowrap.co.in/clients/twc/App/V1/Product/getAllCategoryProducts', {handle_sub_category: 'value1',handle_category: 'value2',flag:[]
//   }, {headers: {'Content-Type': 'application/json','Authorization': `Basic ${auth}`,
//     },
//   })
//     .then(response => {console.log('Response:', response);
//     })
//     .catch(error => {console.error('Error:', error);
//     });
// };
