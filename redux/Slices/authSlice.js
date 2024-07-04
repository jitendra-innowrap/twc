import { createSlice } from '@reduxjs/toolkit';
import storage from '../../util/localStorage'; // Adjust the import path accordingly


// Initial token retrieval
let auth_token, web_token;
if (typeof window !== 'undefined') {
  auth_token = storage.get("auth_token");
  web_token = storage.get("web_token");
  if (auth_token && web_token) {
    // Remove web_token if auth_token is present
    storage.set("web_token",null);
    web_token = null;
  }
}

const initialState = {
  auth: {
    type: auth_token ? 'auth_token' : (web_token ? 'web_token' : ''),
    token: auth_token || web_token || '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      state.auth.token = action.payload.token;
      if (state.auth.type === 'web_token') {
        // Update storage and state for auth_token
        storage.set("auth_token", action.payload.token);
        storage.set("web_token",null);
        state.auth.type = 'auth_token';
      } else {
        // Just update the auth_token in storage
        storage.set("auth_token", action.payload.token);
      }
    },
    setWebToken: (state, action) => {
      state.auth.type = 'web_token';
      state.auth.token = action.payload.token;
      // Update storage and remove auth_token if setting web_token
      storage.set("web_token", action.payload.token);
      storage.set("auth_token",null);
    },
    clearTokens: (state) => {
      state.auth.type = '';
      state.auth.token = '';
      storage.set("auth_token",null);
      storage.set("web_token",null);
    },
  },
});

export const { refreshToken, setWebToken, clearTokens } = authSlice.actions;
export default authSlice.reducer;
