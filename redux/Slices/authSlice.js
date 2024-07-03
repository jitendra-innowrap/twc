// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logOutApi, loginApi } from '../../util/api';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await loginApi(credentials);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await logOutApi();
        storage.set("dokani_user", {auth_token:res?.token, user: res?.result, isLoggedIn:false});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, user: null, status: 'idle', error: null },
    reducers: {
        refreshToken: (state, action) => {
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle login
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle logout
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'succeeded';
                state.token = null;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { refreshToken } = authSlice.actions;
export default authSlice.reducer;
