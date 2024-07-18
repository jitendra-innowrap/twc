import { TbArrowUp } from "react-icons/tb";
import storage from "./localStorage";

export function getYouTubeThumbnail(videoUrl) {
  console.log("VIDEO URL", videoUrl);

  // Create a URL object from the input videoUrl
  const url = new URL(videoUrl);

  // Extract the video ID from the URL
  let videoId;
  if (url.searchParams.has('v')) {
    videoId = url.searchParams.get('v');
  } else if (url.searchParams.has('si')) {
    videoId = url.searchParams.get('si');
  } else {
    // If the video ID cannot be extracted, return null or handle the error
    return null;
  }

  // Construct the thumbnail URL
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
export const priceOffPercentage = (mrp, price) => {
  const offPercentage = ((mrp - price) / mrp) * 100;

  // Round the result to two decimal places
  return Math.round(offPercentage);
}

export function generateRandomTransactionId() {
  // Generate a random 16-digit transaction ID
  return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
}

export const isLoggedIn =()=>{
  const token = storage.get("auth_token");
  if(token){
    return true
  }
  return false;
}
export const getToken =()=>{
  const token = storage.get("auth_token");
  return token;
}
export const clipDateOnly = (date) => {
  // Extract only the date part in 'dd-mm-yyyy' format
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateOnly = `${year}-${month}-${day}`;

  return dateOnly;
};
export const getDateFromString = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateOnly = `${year}-${month}-${day}`;

  return dateOnly;
};
export const reverseDateOrder =(date)=>{
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
}

// Delete Product from List By Id
export const deleteProduct = (list, product) => {
  console.log(product)
  const filter = list.filter(item => {
    return !(item.id == product.id && item.color == product.color && item.size == product.size)
});
console.log('updated list', filter)
    return filter;
  };
  
  // Find Product Index From List
  export const findProductIndex = (list, slug) => {
    const index = list.findIndex((item) => item.slug === slug);
    return index;
  };
  export const findProductIndexById = (list, id) => {
    const index = list.findIndex((item) => item.id === id);
    return index;
  };
  
  export const findProductIndexByVariant = (cart, product) => {
    return cart.findIndex(cartItem => 
        cartItem.id === product.id &&
        cartItem.size === product.size && 
        cartItem.color === product.color
    );
  };
  export const deleteProductByVariant = (cart, product) => {
    const newCart = cart.filter(cartItem => {
        return !(cartItem.id == product.id && cartItem.color == product.color && cartItem.size == product.size)
    });
    return newCart
}

export function generateRandomId(length, numbersonly) {
  let id = '';
  const characters = numbersonly ? '0123456789' : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}