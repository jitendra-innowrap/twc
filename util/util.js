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
