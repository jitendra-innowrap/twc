// utils/api.js

import axios from 'axios';

const username = 'PLKT-,9_d63YGYIc87(^5';
const password = 'PLKRn72^8YKqRip8v^a#|';
const auth = Buffer.from(`${username}:${password}`, 'utf-8').toString('base64');

export const getAllCollectionProducts = async () => {
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
