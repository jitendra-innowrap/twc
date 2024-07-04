// StorageWrapper.js
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import storage from "../../util/localStorage"; // Adjust the import path accordingly
import { fetchCart } from "../../redux/Slices/cartSlice";
import { refreshToken, setWebToken } from "../../redux/Slices/authSlice"; // Adjust the import path accordingly

const generateGuestToken = () => {
  const randomString = Math.random().toString(36).substring(2);
  const token = btoa(randomString);
  return token;
};

const StorageWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage only if window is defined
      const auth_token = storage.get("auth_token");
      const web_token = storage.get("web_token");

      if (auth_token) {
        // Token exists, refresh auth state
        dispatch(refreshToken({ token: auth_token }));
      } else if (web_token) {
        // Web token exists, set auth state
        dispatch(setWebToken({ token: web_token }));
      } else {
        // No token found, create guest web token
        const token = generateGuestToken();

        // Save guest web token to local storage
        storage.set("web_token", token);

        // Dispatch setWebToken action with guest web token
        dispatch(setWebToken({ token }));
      }

      // Fetch cart data from server
      dispatch(fetchCart());
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default StorageWrapper;
