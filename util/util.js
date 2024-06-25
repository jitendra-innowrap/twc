
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