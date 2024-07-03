// StorageWrapper.js
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import storage from "../../util/localStorage"; // Adjust the import path accordingly
import { fetchCart, initLocalStorage } from "../../redux/Slices/cartSlice";

const StorageWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = null;
    const wishlist = storage.get("dokani_wishlist");
    const user = storage.get("dokani_user");

    if (cart && wishlist && user) {
      dispatch(initLocalStorage({ cart, wishlist, compare, user }));
    } else {
      dispatch(fetchCart());

    }
  }, [dispatch]);

  return <>{children}</>;
};

export default StorageWrapper;
